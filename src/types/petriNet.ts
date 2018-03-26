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
  source: string;
  target: string;
}

export interface IPetriObject {
  positions?: Array<IPlace>;
  transitions?: Array<ITransition>;
  incomingArcs?: Array<IArc>;
  outgoingArcs?: Array<IArc>;
  simulationTime?: number;
}
