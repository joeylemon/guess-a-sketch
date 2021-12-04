import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'
import ProbabilityBlock from './ProbabilityBlock'

const Probabilities = () => {
    const probabilities = useSelector(state => state.probabilities)

    return (
        <Card style={{ maxWidth: '512px', height: '100%' }}>
            {probabilities.map((obj, i) => {
                return <ProbabilityBlock number={obj.probability} label={obj.label} key={i}></ProbabilityBlock>
            })}
        </Card>
    )
}

export default Probabilities
