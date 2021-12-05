import React from 'react'
import styled from 'styled-components'

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

const Links = styled.p`
    margin: 0px;
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
                <Link href="#"><Icon className={'fa fa-github'}></Icon>React App</Link>
                <Link href="#"><Icon className={'fa fa-github'}></Icon>Neural Network</Link>
            </Links>
        </Container>
    )
}

export default Header
