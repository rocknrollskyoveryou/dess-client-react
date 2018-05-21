import { IPetriNet, ITransitionParams, IPlaceParams } from '../types/petriNet';

export const SELECT_ELEMENT = 'SELECT_ELEMENT';
export type SELECT_ELEMENT = typeof SELECT_ELEMENT;

export const RELEASE_ELEMENT = 'RELEASE_ELEMENT';
export type RELEASE_ELEMENT = typeof RELEASE_ELEMENT;

export const ADD_ELEMENT = 'ADD_ELEMENT';
export type ADD_ELEMENT = typeof ADD_ELEMENT;

export const UPDATE_ELEMENT = 'UPDATE_ELEMENT';
export type UPDATE_ELEMENT = typeof UPDATE_ELEMENT;

export const SELECT_ARC = 'SELECT_ARC';
export type SELECT_ARC = typeof SELECT_ARC;

export const ADD_ARC = 'ADD_ARC';
export type ADD_ARC = typeof ADD_ARC;

export const DRAW_ARC = 'DRAW_ARC';
export type DRAW_ARC = typeof DRAW_ARC;

export const UI_PLACE_RADIUS = 36;
export const UI_TRANS_WIDTH = 18;
export const UI_TRANS_HEIGHT = 72;
export const UI_ELEMENT_FILL = '#fff';
export const UI_ELEMENT_STROKE = '#757575';
export const UI_SELECTED_ELEMENT_FILL = '#9FA8DA';
export const UI_SELECTED_ELEMENT_STROKE = '#3F51B5';

export const PRELOADED_STATE = {
  petriNet: {
    id: '',
    name: 'New Petri Net',
    elements: [
      {
        id: 'place-1',
        type: 0,
        params: <IPlaceParams> {
          label: 'Place 1',
          mark: 1,
        },
        ui: {
          x: 100,
          y: 200,
        },
        isPublic: false,
        isImportant: false,
      },
      // {
      //   id: 'place-1',
      //   type: 0,
      //   params: <IPlaceParams> {
      //     label: 'Place 2',
      //     mark: 1,
      //   },
      //   ui: {
      //     x: 100,
      //     y: 200,
      //   },
      //   isPublic: false,
      //   isImportant: false,
      // },
      {
        id: 'transition-1',
        type: 1,
        params: <ITransitionParams> {
          label: 'Transition 1',
          priority: 1,
          param: 2,
          paramDeviation: 1,
          distribution: 'exp',
        },
        ui: {
          x: 400,
          y: 300,
        },
        isPublic: false,
        isImportant: false,
      },
      // {
      //   id: 'transition-2',
      //   type: 1,
      //   params: <ITransitionParams> {
      //     label: 'Transition 2',
      //     priority: 2,
      //     param: 5,
      //     paramDeviation: 2,
      //     distribution: 'exp',
      //   },
      //   ui: {
      //     x: 400,
      //     y: 100,
      //   },
      //   isPublic: false,
      //   isImportant: false,
      // },
    ],
    arcs: [
      // {
      //   source: 'place-1',
      //   target: 'transition-1',
      // },
    ],
    ui: {
      selectedElementIdx: -1,
      selectedArcIdx: -1,
    },
  },
};
