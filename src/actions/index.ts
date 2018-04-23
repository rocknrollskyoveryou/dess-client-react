import * as constants from '../constants';
import { IPlace, ITransition, IArc, IArcDrawer } from '../types/petriNet';

export interface IAddPlace {
    type: constants.ADD_PLACE;
    place: IPlace;
}

export interface IUpdatePlace {
    type: constants.UPDATE_PLACE;
    place: IPlace;
}

export interface IAddTransition {
    type: constants.ADD_TRANSITION;
    transition: ITransition;
}

export interface IUpdateTransition {
    type: constants.UPDATE_TRANSITION;
    transition: ITransition;
}

export interface IAddArc {
    type: constants.ADD_ARC;
    arc: IArc;
}

export interface IDrawArc {
    type: constants.DRAW_ARC;
    arcDrawer: IArcDrawer;
}

export type IPetriNetAddAction = IAddPlace | IAddTransition | IAddArc | IDrawArc;

export type IPetriNetUpdateAction = IUpdatePlace | IUpdateTransition;

export type IPetriNetAction = IPetriNetAddAction | IPetriNetUpdateAction;

export function addPlace(place: IPlace): IAddPlace {
    return {
        type: constants.ADD_PLACE,
        place,
    };
}

export function updatePlace(place: IPlace): IUpdatePlace {
    return {
        type: constants.UPDATE_PLACE,
        place,
    };
}

export function addTransition(transition: ITransition): IAddTransition {
    return {
        type: constants.ADD_TRANSITION,
        transition,
    };
}

export function updateTransition(transition: ITransition): IUpdateTransition {
    return {
        type: constants.UPDATE_TRANSITION,
        transition,
    };
}

export function addArc(arc: IArc): IAddArc {
    return {
        type: constants.ADD_ARC,
        arc,
    };
}

export function drawArc(arcDrawer: IArcDrawer): IDrawArc {
    return {
        type: constants.DRAW_ARC,
        arcDrawer,
    };
}
