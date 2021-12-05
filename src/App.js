import React from 'react'
import styled from 'styled-components'
import DrawCanvas from './components/DrawCanvas'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Probabilities from './components/Probabilities'
import Controls from './components/Controls'
import Header from './components/Header'

const Wrapper = styled.div`
    text-align: center;
    padding: 0px;
    padding-top: 10px;
`

const Content = styled.div`
    display: inline-block;
    padding: 0px;
`

const App = () => {
    return (
        <Wrapper>
            <Content>
                <Grid fluid>
                    <Row>
                        <Col lg>
                            <Header />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg>
                            <DrawCanvas />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg>
                            <Controls />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg>
                            <Probabilities />
                        </Col>
                    </Row>
                </Grid>
            </Content>
        </Wrapper>
    )
}

export default App
