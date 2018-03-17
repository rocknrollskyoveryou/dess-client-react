import { IPObjectAction } from '../actions';
import { IPetriObject } from '../types/petriNet';
import { ADD_POSITION, ADD_TRANSITION } from '../constants/index';

const INITIAL_STATE: IPetriObject = {
    positions: [],
    transitions: [],
    incomingArcs: [],
    outgoingArcs: [],
    simulationTime: 0,
};

function pObjectReducer(state: IPetriObject = INITIAL_STATE, action: IPObjectAction): IPetriObject {
    switch (action.type) {
    case ADD_POSITION:
        return {
            ...state,
            positions: []
        };
    case ADD_TRANSITION:
        return {
            ...state,
            transitions: []
        };
    default:
        return state;    
    }
}

export default pObjectReducer;