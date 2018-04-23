export interface IPlace {
  id: string;
  mark: number;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ITransition {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  priority: number;
}

export interface IArc {
  placeId: string;
  transitionId: string;
}

export interface IIncomingArcDrawer {
  placeId: string;
  mouseX: number;
  mouseY: number;
}

export interface IOutgoingArcDrawer {
  transitionId: string;
  mouseX: number;
  mouseY: number;
}

export interface IPetriNet {
  places: Array<IPlace>;
  transitions: Array<ITransition>;
  incomingArcs: Array<IArc>;
  outgoingArcs: Array<IArc>;
  incomingArcDrawer?: IIncomingArcDrawer;
  outgoingArcDrawer?: IOutgoingArcDrawer;
}
