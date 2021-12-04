import { ACTIONS } from './actions'
import { SKETCH_NAMES } from '../services/Utils'

const initialState = {
    probabilities: SKETCH_NAMES.map(n => ({ label: n, probability: 0.0 }))
}

function rootReducer (state = initialState, action) {
    const { payload, type } = action
    switch (type) {
    case ACTIONS.SET_PROBABILITIES: {
        return { ...state, probabilities: payload }
    }
    default: {
        return { ...state }
    }
    }
};

export default rootReducer
