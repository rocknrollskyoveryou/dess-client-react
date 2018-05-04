import { IPetriNet } from '../types/petriNet';

export const SELECT_PLACE = 'SELECT_PLACE';
export type SELECT_PLACE = typeof SELECT_PLACE;

export const ADD_PLACE = 'ADD_PLACE';
export type ADD_PLACE = typeof ADD_PLACE;

export const UPDATE_PLACE = 'UPDATE_PLACE';
export type UPDATE_PLACE = typeof UPDATE_PLACE;

export const SELECT_TRANSITION = 'SELECT_TRANSITION';
export type SELECT_TRANSITION = typeof SELECT_TRANSITION;

export const ADD_TRANSITION = 'ADD_TRANSITION';
export type ADD_TRANSITION = typeof ADD_TRANSITION;

export const UPDATE_TRANSITION = 'UPDATE_TRANSITION';
export type UPDATE_TRANSITION = typeof UPDATE_TRANSITION;

export const SELECT_ARC = 'SELECT_ARC';
export type SELECT_ARC = typeof SELECT_ARC;

export const ADD_ARC = 'ADD_ARC';
export type ADD_ARC = typeof ADD_ARC;

export const DRAW_ARC = 'DRAW_ARC';
export type DRAW_ARC = typeof DRAW_ARC;

export const PRELOADED_STATE = {
    petriNet: {
        places: [
            {
                id: 'place-1',
                mark: 1,
                label: 'Place 1',
                x: 100,
                y: 200,
                width: 72,
                height: 72,
            },
        ],
        transitions: [
            {
                id: 'transition-1',
                label: 'Transition 1',
                x: 400,
                y: 300,
                width: 18,
                height: 72,
                priority: 1,
                param: 2,
                paramDeviation: 1,
                distribution: 'exp',
            },
            {
                id: 'transition-2',
                label: 'Transition 2',
                x: 400,
                y: 100,
                width: 18,
                height: 72,
                priority: 2,
                param: 5,
                paramDeviation: 2,
                distribution: 'exp',
            },
        ],
        arcs: [
            {
                source: 'place-1',
                target: 'transition-1',
                isIncoming: true,
            },
        ],
        selectedPlaceIdx: -1,
        selectedTransitionIdx: -1,
        selectedArcIdx: -1,
    },
};
