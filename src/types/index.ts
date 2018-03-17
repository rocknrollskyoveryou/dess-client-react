import { IPetriObject } from './petriNet';

// Redux state
export interface IStoreState {
    petriObject: IPetriObject;
}

// Material-ui style rules
export interface IClasses {
    [key: string]: string;
}
