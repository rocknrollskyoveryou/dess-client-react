export interface IPosition {
  id: number;
  mark: number;
}

export interface ITransition {
  id: number;
}

export interface IArc {
  position: IPosition;
  transition: ITransition;
}

export interface IPetriObject {
  positions?: Array<IPosition>;
  transitions?: Array<ITransition>;
  incomingArcs?: Array<IArc>;
  outgoingArcs?: Array<IArc>;
  simulationTime?: number;
}
