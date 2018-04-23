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
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface IPetriNet {
  places: Array<IPlace>;
  transitions: Array<ITransition>;
  incomingArcs: Array<IArc>;
  outgoingArcs: Array<IArc>;
}
