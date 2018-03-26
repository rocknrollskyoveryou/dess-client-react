import * as constants from '../constants';
import { IPlace, ITransition } from '../types/petriNet';
import transitions from 'material-ui/styles/transitions';

export interface IAddPlace {
    type: constants.ADD_PLACE;
    place: IPlace;
}

export interface IAddTransition {
    type: constants.ADD_TRANSITION;
    transition: ITransition;
}

export type IPObjectAction = IAddPlace | IAddTransition;

export function addPlace(place: IPlace): IAddPlace {
    return {
        type: constants.ADD_PLACE,
        place,
    };
}

export function addTransition(transition: ITransition): IAddTransition {
    return {
        type: constants.ADD_TRANSITION,
        transition,
    };
}