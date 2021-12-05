import React from 'react'
import styled from 'styled-components'
import { SKETCH_NAMES } from '../services/Utils'

const Container = styled.div`
    text-align: center;
`

const Title = styled.h1`
    margin: 0px;
    padding: 0px;
    text-align: center;
    font-family: 'Joblot';
    font-size: max(min(6vw, 100px), 30px);
    color: #efb35a;
`

const Desc = styled.p`
    display: inline-block;
    width: min(80vw, 512px);
    margin: 0px;
    margin-bottom: 10px;
    padding: 0px;
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    color: gray;
    text-align: justify;
    font-style: italic;
`

const Links = styled.p`
    margin: -5px;
    padding: 0px;
    margin-bottom: 15px;
    *:not(:first-child) {
        margin-left: 15px;
    }
`

const Link = styled.a`
    display: inline-block;
    font-family: 'Sora', sans-serif;
    text-decoration: none;
    color: gray;
    font-weight: bold;
`

const Icon = styled.i`
    margin-right: 3px;
`

/**
 * This component represents the header to the application
 */
const Header = () => {
    return (
        <Container>
            <Title>Guess-a-Sketch</Title>
            <Links>
                <Link href="https://github.com/joeylemon/guess-a-sketch"><Icon className={'fa fa-github'}></Icon>React App</Link>
                <Link href="https://github.com/joeylemon/sketch-classifier"><Icon className={'fa fa-github'}></Icon>Neural Network</Link>
            </Links>
            <Desc>Sketch on the canvas below and watch as the neural network attempts to guess what you drew. Currently, the network only knows about {SKETCH_NAMES.length} types of objects; view all of them in the box below the canvas.</Desc>
        </Container>
    )
}

export default Header
