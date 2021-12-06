import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Card from './Card'

const HiddenScrollCard = styled(Card)`
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
        background: transparent;
    }

    user-select: none;
`

/**
 * This component represents a Card that can scroll horizontally using mouse or touch drags
 */
const ScrollableCard = ({ children, style, width }) => {
    const predictions = useSelector(state => state.predictions)
    const cardRef = useRef(null)
    const mouseDown = useRef(null)
    const scrollAmount = useRef(0)
    const lastScroll = useRef(0)

    /**
     * Register events to allow mouse dragging to scroll the card
     */
    useEffect(() => {
        const card = cardRef.current

        card.addEventListener('mousedown', e => {
            mouseDown.current = e.clientX - e.currentTarget.getBoundingClientRect().left
        })

        window.addEventListener('mousemove', e => {
            if (mouseDown.current !== null) {
                const loc = e.clientX - cardRef.current.getBoundingClientRect().left
                const maxWidth = cardRef.current.scrollWidth - cardRef.current.clientWidth

                let amount = scrollAmount.current + mouseDown.current - loc
                if (amount < 0) { amount = 0 }
                if (amount > maxWidth) { amount = maxWidth }

                lastScroll.current = amount
                cardRef.current.scroll(amount, 0)
            }
        })

        window.addEventListener('mouseup', e => {
            if (mouseDown.current !== null) {
                mouseDown.current = null
                scrollAmount.current = lastScroll.current
                lastScroll.current = 0
            }
        })
    }, [])

    useEffect(() => {
        cardRef.current.scroll(0, 0)
        scrollAmount.current = 0
    }, [predictions])

    return (
        <HiddenScrollCard ref={cardRef} style={{ ...style, overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap' }}>
            <div style={{ width: width }}>
                {children}
            </div>
        </HiddenScrollCard>
    )
}

ScrollableCard.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    style: PropTypes.object,
    width: PropTypes.string
}

export default ScrollableCard
