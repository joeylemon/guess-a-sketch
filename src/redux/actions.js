import { SKETCH_NAMES } from '../services/Utils'

export const ACTIONS = {
    SET_PROBABILITIES: 'SET_PROBABILITIES',
    RESET_CANVAS: 'RESET_CANVAS'
}

export function setProbabilities (payload) {
    return { type: ACTIONS.SET_PROBABILITIES, payload }
}

export function resetProbabilities () {
    return { type: ACTIONS.SET_PROBABILITIES, payload: SKETCH_NAMES.map(n => ({ label: n, probability: 0.0 })) }
}

export function resetCanvas (payload) {
    return { type: ACTIONS.RESET_CANVAS, payload }
}
