import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Card from './Card'
import { resetCanvas } from '../redux/actions'

const Button = styled.button`
    display: inline-block;
    font-family: 'Sora', sans-serif;
    font-size: 20px;
    border: none;
    border-radius: 8px;
    background-color: #00adff;
    color: white;
    width: 200px;
    height: 40px;
`

const Controls = () => {
    const dispatch = useDispatch()

    return (
        <Card style={{ maxWidth: '512px' }}>
            <Button onClick={() => dispatch(resetCanvas(true))}>Reset canvas</Button>
        </Card>
    )
}

export default Controls
