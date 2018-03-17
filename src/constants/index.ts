import { IPetriObject } from '../types/petriNet';

export const ADD_POSITION = 'ADD_POSITION';
export type ADD_POSITION = typeof ADD_POSITION;

export const ADD_TRANSITION = 'ADD_TRANSITION';
export type ADD_TRANSITION = typeof ADD_TRANSITION;

export const PRELOADED_STATE = {
    petriObject: <IPetriObject> {},
};
