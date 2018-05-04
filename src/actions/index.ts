import * as constants from '../constants';
import { IPlace, ITransition, IArc, IArcDrawer } from '../types/petriNet';

export interface ISelectPlace {
    type: constants.SELECT_PLACE;
    index: number;
}

export interface IAddPlace {
    type: constants.ADD_PLACE;
    place: IPlace;
}

export interface IUpdatePlace {
    type: constants.UPDATE_PLACE;
    place: IPlace;
}

export interface ISelectTransition {
    type: constants.SELECT_TRANSITION;
    index: number;
}

export interface IAddTransition {
    type: constants.ADD_TRANSITION;
    transition: ITransition;
}

export interface IUpdateTransition {
    type: constants.UPDATE_TRANSITION;
    transition: ITransition;
}

export interface ISelectArc {
    type: constants.SELECT_ARC;
    index: number;
}

export interface IAddArc {
    type: constants.ADD_ARC;
    arc: IArc;
}

export interface IDrawArc {
    type: constants.DRAW_ARC;
    arcDrawer: IArcDrawer;
}

export type IPetriNetAddAction = IAddPlace |
                                 IAddTransition |
                                 IAddArc |
                                 IDrawArc |
                                 ISelectPlace |
                                 ISelectTransition |
                                 ISelectArc;

export type IPetriNetUpdateAction = IUpdatePlace | IUpdateTransition;

export type IPetriNetAction = IPetriNetAddAction | IPetriNetUpdateAction;

export function selectPlace(index: number): ISelectPlace {
    return {
        type: constants.SELECT_PLACE,
        index,
    };
}

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

export function selectTransition(index: number): ISelectTransition {
    return {
        type: constants.SELECT_TRANSITION,
        index,
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

export function selectArc(index: number): ISelectArc {
    return {
        type: constants.SELECT_ARC,
        index,
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
