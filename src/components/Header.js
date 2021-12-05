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

/**
 * This component represents the header to the application
 */
const Header = () => {
    return (
        <Container>
            <Title>Guess-a-Sketch</Title>
        </Container>
    )
}

export default Header
