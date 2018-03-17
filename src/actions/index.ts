import * as constants from '../constants';
import { IPosition, ITransition } from '../types/petriNet';
import transitions from 'material-ui/styles/transitions';

export interface IAddPosition {
    type: constants.ADD_POSITION;
    position: IPosition;
}

export interface IAddTransition {
    type: constants.ADD_TRANSITION;
    transition: ITransition;
}

export type IPObjectAction = IAddPosition | IAddTransition;

export function addPosition(position: IPosition): IAddPosition {
    return {
        type: constants.ADD_POSITION,
        position,
    };
}

export function addTransition(transition: ITransition): IAddTransition {
    return {
        type: constants.ADD_TRANSITION,
        transition,
    };
}