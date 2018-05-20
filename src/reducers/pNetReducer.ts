import { IPetriNet, IPetriNetElement, IArc } from '../types/petriNet';

import * as actions from '../actions';

import {
  RELEASE_ELEMENT, SELECT_ELEMENT, ADD_ELEMENT, UPDATE_ELEMENT,
  SELECT_ARC, ADD_ARC, DRAW_ARC,
} from '../constants/index';

const INITIAL_STATE: IPetriNet = {
  id: '',
  name: 'New Petri Net',
  elements: [],
  arcs: [],
  ui: {
    selectedElementIdx: -1,
    selectedArcIdx: -1,
  }
};

function pNetReducer(state: IPetriNet = INITIAL_STATE, action: actions.IPetriNetAction): IPetriNet {
  switch (action.type) {
    case SELECT_ELEMENT:
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedElementIdx: (<actions.ISelectElement> action).index,
          selectedArcIdx: -1,
        },
      };
    case RELEASE_ELEMENT:
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedElementIdx: -1,
          selectedArcIdx: -1,
        },
      };
    case ADD_ELEMENT:
      return {
        ...state,
        elements: [
          ...state.elements,
          (<actions.IAddElement> action).element,
        ]
      };
    case UPDATE_ELEMENT:
      return {
        ...state,
        elements: state.elements.map((item, index) => {
          if (item.id !== (<actions.IUpdateElement> action).element.id) {
            return item;
          }

          return {
            ...item,
            ...(<actions.IUpdateElement> action).element,
          };
        }),
      };
    case SELECT_ARC:
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedElementIdx: -1,
          selectedArcIdx: (<actions.ISelectArc> action).index,
        }
      };
    case ADD_ARC:
      return {
        ...state,
        arcs: [
          ...state.arcs,
          (<actions.IAddArc> action).arc,
        ],
      };
    case DRAW_ARC:
      return {
        ...state,
        ui: {
          ...state.ui,
          arcDrawer: (<actions.IDrawArc> action).arcDrawer,
        }
      };
    default:
      return state;
  }
}

export default pNetReducer;