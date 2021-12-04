import React, { useRef } from 'react'
import styled from 'styled-components'
import DrawCanvas from './components/DrawCanvas'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Probabilities from './components/Probabilities'
import Controls from './components/Controls'

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
                        <Col lg>
                            <Controls />
                        </Col>
                        <Col lg>
                            <Controls />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg>
                            <DrawCanvas />
                        </Col>
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
