import {
    IPetriNet, IPlace, ITransition, IArc
} from '../types/petriNet';

import {
    IPetriNetAction,
    IAddPlace, IUpdatePlace,
    IAddTransition, IUpdateTransition,
    IAddArc, IDrawArc,
} from '../actions';

import {
    ADD_PLACE, UPDATE_PLACE,
    ADD_TRANSITION, UPDATE_TRANSITION,
    ADD_ARC, DRAW_ARC,
} from '../constants/index';

const INITIAL_STATE: IPetriNet = {
    places: [],
    transitions: [],
    arcs:  [],
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
        case ADD_ARC:
            return {
                ...state,
                arcs: [
                    ...state.arcs,
                    (<IAddArc> action).arc,
                ],
            };    
        case DRAW_ARC:
            return {
                ...state,
                arcDrawer: (<IDrawArc> action).arcDrawer,
            };
        default:
            return state;    
    }
}

export default pNetReducer;