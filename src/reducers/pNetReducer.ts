import {
    IPetriNet, IPlace, ITransition, IArc
} from '../types/petriNet';

import {
    IPetriNetAction,
    IAddPlace, IUpdatePlace,
    IAddTransition, IUpdateTransition,
    IAddArc, IDrawArc, ISelectPlace, ISelectTransition, ISelectArc,
} from '../actions';

import {
    SELECT_PLACE, ADD_PLACE, UPDATE_PLACE,
    SELECT_TRANSITION, ADD_TRANSITION, UPDATE_TRANSITION,
    SELECT_ARC, ADD_ARC, DRAW_ARC,
} from '../constants/index';

const INITIAL_STATE: IPetriNet = {
    places: [],
    transitions: [],
    arcs: [],
    selectedPlaceIdx: -1,
    selectedTransitionIdx: -1,
    selectedArcIdx: -1,
};

function pNetReducer(state: IPetriNet = INITIAL_STATE, action: IPetriNetAction): IPetriNet {
    switch (action.type) {
        case SELECT_PLACE:
            return {
                ...state,
                selectedPlaceIdx: (<ISelectPlace> action).index,
                selectedArcIdx: -1,
                selectedTransitionIdx: -1,
            };
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
        case SELECT_TRANSITION:
            return {
                ...state,
                selectedPlaceIdx: -1,
                selectedArcIdx: -1,
                selectedTransitionIdx: (<ISelectTransition> action).index,
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
        case SELECT_ARC:
            return {
                ...state,
                selectedPlaceIdx: -1,
                selectedArcIdx: (<ISelectArc> action).index,
                selectedTransitionIdx: -1,
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