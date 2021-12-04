import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'
import ProbabilityBlock from './ProbabilityBlock'

const MAX_SIZE = 512

const Probabilities = () => {
    const probabilities = useSelector(state => state.probabilities)

    /**
     * grid of blocks
     */
    return (
        <Card style={{ maxWidth: '512px' }}>
            {probabilities.map((obj, i) => {
                return <ProbabilityBlock number={obj.probability} label={obj.label} key={i}></ProbabilityBlock>
            })}
        </Card>
    )
}

export default Probabilities
