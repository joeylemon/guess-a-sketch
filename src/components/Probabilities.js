import React from 'react'
import { useSelector } from 'react-redux'
import ScrollableCard from './ScrollableCard'
import ProbabilityBlock from './ProbabilityBlock'

/**
 * This component represents a container holding a horizontal list of drawing probabilities
 */
const Probabilities = () => {
    const probabilities = useSelector(state => state.probabilities)

    return (
        <ScrollableCard width={'min(80vw, 512px)'} style={{ marginTop: '25px' }}>
            {probabilities.map((obj, i) => {
                return <ProbabilityBlock number={obj.probability} label={obj.label} key={i}></ProbabilityBlock>
            })}
        </ScrollableCard>
    )
}

export default Probabilities
