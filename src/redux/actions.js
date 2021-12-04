export const ACTIONS = {
    SET_PROBABILITIES: 'SET_PROBABILITIES'
}

export function setProbabilities (payload) {
    return { type: ACTIONS.SET_PROBABILITIES, payload }
}
