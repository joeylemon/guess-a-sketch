import React from 'react'
import styled from 'styled-components'
import DrawCanvas from './components/DrawCanvas'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Probabilities from './components/Probabilities'

const Wrapper = styled.div`
    text-align: center;
`

const Content = styled.div`
    display: inline-block;
    padding: 40px;
`

const App = () => {
    return (
        <Wrapper>
            <Content>
                <Grid fluid>
                    <Row>
                        <Col xs>
                            <DrawCanvas />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs>
                            <Probabilities />
                        </Col>
                    </Row>
                </Grid>
            </Content>
        </Wrapper>
    )
}

export default App
