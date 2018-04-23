import {
    IPetriNetAction, IAddPlace, IUpdatePlace, IAddTransition, IUpdateTransition, IAddIncomingArc, IAddOutgoingArc
} from '../actions';
import { IPetriNet, IPlace, ITransition, IArc } from '../types/petriNet';
import {
    ADD_PLACE, UPDATE_PLACE, ADD_TRANSITION, UPDATE_TRANSITION, ADD_INCOMING_ARC, ADD_OUTGOING_ARC
} from '../constants/index';

const INITIAL_STATE: IPetriNet = {
    places: [],
    transitions: [],
    incomingArcs:  [],
    outgoingArcs: [],
};

function pNetReducer(state: IPetriNet = INITIAL_STATE, action: IPetriNetAction): IPetriNet {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: [
                    ...state.places,
                    (<IAddPlace> action).place,
                ]
            };
        case UPDATE_PLACE:
            return {
                ...state,
                places: state.places.map( (item, index) => {
                    if (item.id !== (<IUpdatePlace> action).place.id) {
                        return item;
                    }

                    return {
                        ...item,
                        ...(<IUpdatePlace> action).place,
                    };    
                }),
            };    
        case ADD_TRANSITION:
            return {
                ...state,
                transitions: [
                    ...state.transitions,
                    (<IAddTransition> action).transition,
                ]
            };
        case UPDATE_TRANSITION: 
            return {
                ...state,
                transitions: state.transitions.map( (item, index) => {
                    if (item.id !== (<IUpdateTransition> action).transition.id) {
                        return item;
                    }

                    return {
                        ...item,
                        ...(<IUpdateTransition> action).transition,
                    };    
                }),
            };    
        case ADD_INCOMING_ARC:
            return {
                ...state,
                incomingArcs: [
                    ...state.incomingArcs,
                    (<IAddIncomingArc> action).arc,
                ],
            };    
        case ADD_OUTGOING_ARC:
            return {
                ...state,
                outgoingArcs: [
                    ...state.outgoingArcs,
                    (<IAddOutgoingArc> action).arc,
                ],
            };
        default:
            return state;    
    }
}

export default pNetReducer;