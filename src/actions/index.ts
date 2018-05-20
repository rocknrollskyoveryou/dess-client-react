import * as constants from '../constants';
import { IPetriNetElement, IArc, IArcDrawer } from '../types/petriNet';

export interface ISelectElement {
    type: constants.SELECT_ELEMENT;
    index: number;
}

export interface IReleaseElement {
    type: constants.RELEASE_ELEMENT;
}

export interface IAddElement {
    type: constants.ADD_ELEMENT;
    element: IPetriNetElement;
}

export interface IUpdateElement {
    type: constants.UPDATE_ELEMENT;
    element: IPetriNetElement;
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
    arcDrawer: IArcDrawer | undefined;
}

export type IPetriNetAddAction = IAddElement |
                                 IAddArc |
                                 IDrawArc |
                                 ISelectElement |
                                 IReleaseElement |
                                 ISelectArc;

export type IPetriNetUpdateAction = IUpdateElement | IUpdateElement;

export type IPetriNetAction = IPetriNetAddAction | IPetriNetUpdateAction;

export function selectElement(index: number): ISelectElement {
    return {
        type: constants.SELECT_ELEMENT,
        index,
    };
}

export function releaseElement(): IReleaseElement {
    return {
        type: constants.RELEASE_ELEMENT,
    };
}

export function addElement(element: IPetriNetElement): IAddElement {
    return {
        type: constants.ADD_ELEMENT,
        element,
    };
}

export function updateElement(element: IPetriNetElement): IUpdateElement {
    return {
        type: constants.UPDATE_ELEMENT,
        element,
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

export function drawArc(arcDrawer: IArcDrawer | undefined): IDrawArc {
    return {
        type: constants.DRAW_ARC,
        arcDrawer,
    };
}
