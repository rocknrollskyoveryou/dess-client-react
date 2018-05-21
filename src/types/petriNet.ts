export interface IElementParams {
  label: string;
  isPublic: boolean;
  isImportant: boolean;
}

export interface IPlaceParams extends IElementParams {
  mark: number;
}

export interface ITransitionParams extends IElementParams {
  priority: number;
  param: number;
  paramDeviation?: number;
  distribution: string;
}

export interface IArcParams {
  quantity: number;
  isInfo: boolean;
}

export interface IModelParams {
  simulationTime: number;
}

export enum PetriNetElementType { Place, Transition }

export interface IPetriNetElement {
  id: string;
  type: PetriNetElementType;
  ui: {
    x: number;
    y: number;
  };
  params?: ITransitionParams | IPlaceParams;
}

export interface IArc {
  source: string;
  target: string;
  params?: IArcParams;
}

export interface IArcDrawer {
  source: IPetriNetElement;
  mouseX: number;
  mouseY: number;
}

export interface IPetriNet {
  id: string;
  name: string;
  elements: Array<IPetriNetElement>;
  arcs: Array<IArc>;
  ui: {
    arcDrawer?: IArcDrawer;
    selectedElementIdx: number;
    selectedArcIdx: number;
  };
}

export interface IPetriObject {
  id: string;
  name: string;
  petriNetId: number;
  params?: Array<IPetriNetElement>;
}

export interface IModel {
  id: string;
  name: string;
  petriObjects: Array<IPetriObject>;
  params?: IModelParams;
}

export interface IResourceViewModel {
  id: string;
  name: string;
}

export interface IResourceViewPetriNet {
  id: string;
  name: string;
}
