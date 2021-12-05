import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colorGradient, capitalize } from '../services/Utils.js'

// What colors to define the value gradient?
const START_COLOR = [0, 175, 0]
const END_COLOR = [255, 175, 0]

const Container = styled.div`
    display: inline-block;
    margin: 5px;
    margin-right: 35px;
    text-align: left;
`

const Number = styled.p`
    display: inline-block;
    margin: 0px;
    margin-right: 10px;
    padding: 0px;
    font-size: 32px;
    font-family: 'JetBrains Mono', monospace;
`

const Label = styled.p`
    display: inline-block;
    margin: 0px;
    padding: 0px;
    font-size: 20px;
    font-family: 'Sora', sans-serif;
`

/**
 * This component represents a single probability value for a type of sketch
 */
const ProbabilityBlock = ({ number, label }) => {
    const color = colorGradient(START_COLOR, END_COLOR, number)

    return (
        <Container>
            <Number style={{ color: color }}>{(number * 100).toFixed(1)}%</Number>
            <Label>{capitalize(label)}</Label>
        </Container>
    )
}

ProbabilityBlock.propTypes = {
    number: PropTypes.number,
    label: PropTypes.string
}

export default ProbabilityBlock
