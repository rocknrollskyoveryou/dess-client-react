import * as constants from '../constants';
import { IPlace, ITransition, IArc } from '../types/petriNet';

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

export interface IAddIncomingArc {
    type: constants.ADD_INCOMING_ARC;
    arc: IArc;
}

export interface IAddOutgoingArc {
    type: constants.ADD_OUTGOING_ARC;
    arc: IArc;
}

export type IPetriNetAddAction = IAddPlace | IAddTransition | IAddIncomingArc | IAddOutgoingArc;

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

export function addIncomingArc(arc: IArc): IAddIncomingArc {
    return {
        type: constants.ADD_INCOMING_ARC,
        arc,
    };
}

export function addOutgoingArc(arc: IArc): IAddOutgoingArc {
    return {
        type: constants.ADD_OUTGOING_ARC,
        arc,
    };
}