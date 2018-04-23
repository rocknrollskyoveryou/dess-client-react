import { IPetriNet } from './petriNet';

// Redux state
export interface IStoreState {
    petriNet: IPetriNet;
}

// Material-ui style rules
export interface IClasses {
    [key: string]: string;
}
