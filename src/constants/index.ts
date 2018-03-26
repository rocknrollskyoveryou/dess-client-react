import { IPetriObject } from '../types/petriNet';

export const ADD_PLACE = 'ADD_PLACE';
export type ADD_PLACE = typeof ADD_PLACE;

export const ADD_TRANSITION = 'ADD_TRANSITION';
export type ADD_TRANSITION = typeof ADD_TRANSITION;

export const PRELOADED_STATE = {
    petriObject: <IPetriObject> {},
};
