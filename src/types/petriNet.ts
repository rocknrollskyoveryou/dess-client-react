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
  param: number;
  paramDeviation?: number;
  distribution: string;
}

export interface IArc {
  source: string;
  target: string;
  isIncoming: boolean;
}

interface IArcCreator {
  source: string;
  mouseX: number;
  mouseY: number;
  isIncoming: boolean;
}

export type IArcDrawer = IArcCreator | undefined;

export interface IPetriNet {
  places: Array<IPlace>;
  transitions: Array<ITransition>;
  arcs: Array<IArc>;
  arcDrawer?: IArcDrawer;
}
