import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import simplify from 'simplify-js'
import { detectImage } from '../services/Detect.js'
import Card from './Card'
import { resetCanvas, resetProbabilities } from '../redux/actions'
import { cropAndScaleStrokes } from '../services/Utils.js'

// What is the max size (in px) that the canvas can be?
const MAX_SIZE = 512

// What colors to use on each separate stroke when exporting to network?
const COLORS = ['white', 'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'gray', 'cyan', 'pink']

const Canvas = styled.canvas`
    display: inline-block;
`

/**
 * Get the location of a mouse or touch event relative to parent element
 * @param {MouseEvent | TouchEvent} e The event reference
 * @returns {Object} The relative position
 */
const getEventLocation = e => {
    const rect = e.target.getBoundingClientRect()
    if (e.targetTouches !== undefined) {
        return { x: e.targetTouches[0].pageX - rect.left, y: e.targetTouches[0].pageY - rect.top }
    }

    return { x: e.pageX - rect.left, y: e.pageY - rect.top }
}

/**
 * This component represents a canvas that can register and draw strokes, and then predict the
 * sketch after every stroke
 */
const DrawCanvas = () => {
    const dispatch = useDispatch()

    const performReset = useSelector(state => state.resetCanvas)

    const canvasRef = useRef(null)
    const draggingVal = useRef(false)
    const currentStroke = useRef([])
    const strokes = useRef([])

    const handleStrokeStart = e => {
        const ctx = canvasRef.current.getContext('2d')
        draggingVal.current = true

        const pt = getEventLocation(e)
        ctx.beginPath()
        ctx.moveTo(pt.x, pt.y)
        currentStroke.current.push(pt)
    }

    const handleStrokeMove = e => {
        if (draggingVal.current) {
            const ctx = canvasRef.current.getContext('2d')
            const pt = getEventLocation(e)
            currentStroke.current.push(pt)

            ctx.lineWidth = 5
            ctx.lineTo(pt.x, pt.y)
            ctx.stroke()
        }
    }

    const handleStrokeFinish = () => {
        draggingVal.current = false

        if (currentStroke.current.length > 1) {
            strokes.current.push(simplify(currentStroke.current, 2))
            detectDrawing()
        }

        currentStroke.current = []
    }

    /**
     * Detect the current drawing on the canvas using the neural network
     */
    const detectDrawing = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        drawForExtraction(ctx)
        detectImage(ctx, canvas.width)
        draw(ctx)
    }

    /**
     * Draw the strokes on the canvas for viewing by the user
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context
     */
    const draw = ctx => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        ctx.lineWidth = 5
        ctx.strokeStyle = 'black'

        for (let j = 0; j < strokes.current.length; j++) {
            const pts = strokes.current[j]

            ctx.beginPath()
            ctx.moveTo(pts[0].x, pts[0].y)

            for (const pt of pts.slice(1)) {
                ctx.lineTo(pt.x, pt.y)
            }

            ctx.stroke()
        }

        // draw the current stroke if it exists
        if (currentStroke.current.length > 0) {
            const current = currentStroke.current

            ctx.strokeStyle = 'black'
            ctx.moveTo(current[0].x, current[0].y)

            for (const pt of current.slice(1)) {
                ctx.lineTo(pt.x, pt.y)
            }

            ctx.stroke()
        }
    }

    /**
     * Draw the strokes on the canvas to prepare them for extraction to the network
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context
     */
    const drawForExtraction = ctx => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        ctx.lineWidth = 5

        const scaledStrokes = cropAndScaleStrokes(strokes.current, ctx.canvas.width)
        for (let j = 0; j < scaledStrokes.length; j++) {
            const pts = scaledStrokes[j]

            ctx.strokeStyle = COLORS[j % COLORS.length]
            ctx.beginPath()
            ctx.moveTo(pts[0].x, pts[0].y)

            for (const pt of pts.slice(1)) {
                ctx.lineTo(pt.x, pt.y)
            }

            ctx.stroke()
        }
    }

    /**
     * Set up the canvas and enable event listeners
     */
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const size = Math.min(MAX_SIZE, document.body.scrollWidth * 0.6)
        canvas.style.width = size
        canvas.style.height = size
        canvas.width = size
        canvas.height = size

        canvas.addEventListener('mousedown', handleStrokeStart)
        canvas.addEventListener('touchstart', handleStrokeStart)

        canvas.addEventListener('mousemove', handleStrokeMove)
        canvas.addEventListener('touchmove', handleStrokeMove)

        canvas.addEventListener('mouseup', handleStrokeFinish)
        canvas.addEventListener('mouseleave', handleStrokeFinish)
        canvas.addEventListener('touchend', handleStrokeFinish)
        canvas.addEventListener('touchcancel', handleStrokeFinish)

        // listen for CTRL+Z keypress to undo last stroke
        window.addEventListener('keydown', e => {
            if (e.ctrlKey && e.key === 'z' && strokes.current.length > 0) {
                strokes.current.pop()
                detectDrawing()
            }
        })
    }, [])

    /**
     * Reset the canvas if button is pressed
     */
    useEffect(() => {
        if (performReset) {
            strokes.current = []
            currentStroke.current = []

            const ctx = canvasRef.current.getContext('2d')
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
            draw(ctx)

            dispatch(resetCanvas(false))
            dispatch(resetProbabilities())
        }
    }, [performReset, dispatch])

    return (
        <Card>
            <Canvas ref={canvasRef}></Canvas>
        </Card>
    )
}

export default DrawCanvas
