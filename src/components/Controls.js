import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { resetCanvas } from '../redux/actions'

const Container = styled.div`
    width: 100%;
    max-width: 512px;
    display: inline-block;
    text-align: center;
`

const Button = styled.button`
    ${Container}:hover & {
        transform: scale(1.05, 1.05);
        cursor: pointer;
    }
    ${Container}:active & {
        transform: scale(1, 1);
        cursor: pointer;
    }
    display: inline-block;
    font-family: 'Sora', sans-serif;
    font-size: 20px;
    border: none;
    border-radius: 8px;
    background-color: #efb35a;
    color: white;
    width: 200px;
    height: 40px;
`

const Icon = styled.i`
    margin-right: 10px;
`

/**
 * This component represents a container holding control buttons to manipulate the canvas
 */
const Controls = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        // reset canvas on ESC
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                dispatch(resetCanvas(true))
            }
        })
    }, [])

    return (
        <Container>
            <Button style={{ width: '100%' }} onClick={() => dispatch(resetCanvas(true))}><Icon className={'fa fa-undo'}></Icon>Reset canvas</Button>
        </Container>
    )
}

export default Controls
