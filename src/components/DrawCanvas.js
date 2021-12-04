import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import simplify from 'simplify-js'
import { detectImage } from '../services/Detect.js'
import Card from './Card'
import { cropAndScaleStrokes } from '../services/Utils.js'

const MAX_SIZE = 512
const COLORS = ['white', 'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'gray', 'cyan', 'pink']

const Canvas = styled.canvas`
    display: inline-block;
`

const DrawCanvas = () => {
    const canvasRef = useRef(null)
    const draggingVal = useRef(false)
    const currentStroke = useRef([])
    const strokes = useRef([])

    /**
     * Set up the canvas and enable event listeners
     */
    const initializeCanvas = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const size = Math.min(MAX_SIZE, document.body.scrollWidth * 0.6)
        canvas.style.width = size
        canvas.style.height = size
        canvas.width = size
        canvas.height = size

        canvas.addEventListener('mousedown', e => {
            draggingVal.current = true

            const pt = { x: e.offsetX, y: e.offsetY }
            ctx.beginPath()
            ctx.moveTo(pt.x, pt.y)
            currentStroke.current.push(pt)
        })

        canvas.addEventListener('mousemove', e => {
            if (draggingVal.current) {
                const pt = { x: e.offsetX, y: e.offsetY }
                currentStroke.current.push(pt)

                ctx.lineWidth = 5
                ctx.lineTo(pt.x, pt.y)
                ctx.stroke()
            }
        })

        canvas.addEventListener('mouseup', e => {
            draggingVal.current = false
            strokes.current.push(simplify(currentStroke.current, 2))
            currentStroke.current = []

            drawForExtraction(ctx)
            detectImage(ctx, canvas.width)
            draw(ctx)
        })
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
        }

        ctx.stroke()
    }

    /**
     * Draw the strokes on the canvas to prepare them for extraction to the network
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context
     */
    const drawForExtraction = ctx => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        ctx.lineWidth = 5

        const scaledStrokes = cropAndScaleStrokes(strokes.current, ctx.canvas.width)
        console.log('scaledStrokes', scaledStrokes)
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

    useEffect(() => {
        initializeCanvas()
    }, [])

    return (
        <Card>
            <Canvas ref={canvasRef}></Canvas>
        </Card>
    )
}

export default DrawCanvas
