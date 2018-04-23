import { IPetriNet } from '../types/petriNet';

export const ADD_PLACE = 'ADD_PLACE';
export type ADD_PLACE = typeof ADD_PLACE;

export const UPDATE_PLACE = 'UPDATE_PLACE';
export type UPDATE_PLACE = typeof UPDATE_PLACE;

export const ADD_TRANSITION = 'ADD_TRANSITION';
export type ADD_TRANSITION = typeof ADD_TRANSITION;

export const UPDATE_TRANSITION = 'UPDATE_TRANSITION';
export type UPDATE_TRANSITION = typeof UPDATE_TRANSITION;

export const ADD_INCOMING_ARC = 'ADD_INCOMING_ARC';
export type ADD_INCOMING_ARC = typeof ADD_INCOMING_ARC;

export const ADD_OUTGOING_ARC = 'ADD_OUTGOING_ARC';
export type ADD_OUTGOING_ARC = typeof ADD_OUTGOING_ARC;

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
            },
            {
                id: 'transition-2',
                label: 'Transition 2',
                x: 400,
                y: 100,
                width: 18,
                height: 72,
                priority: 2,
            },
        ],
        incomingArcs:  [
            {
                placeId: 'place-1',
                transitionId: 'transition-1',
                x1: 177,
                y1: 277,
                x2: 375,
                y2: 223,
            },
            {
                placeId: 'place-1',
                transitionId: 'transition-2',
                x1: 177,
                y1: 277,
                x2: 375,
                y2: 23,
            }
        ],
        outgoingArcs: [],
    },
};
