import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// Types
import { IStoreState } from '../types';
import { IPlace, ITransition, IIncomingArcDrawer, IOutgoingArcDrawer } from '../types/petriNet';

// Dumb component
import PNetDesigner, { IProps } from '../components/PNetDesigner';

// Redux actions
import {
  IPetriNetAction, addPlace, updatePlace, addTransition, updateTransition, drawIncomingArc, drawOutgoingArc
} from '../actions';

const mapStateToProps = ({ petriNet }: IStoreState) => {
  return {
    petriNet,
  };
};

const mapDispathToProps = (dispatch: Dispatch<IPetriNetAction>) => {
  return {
    onAddPlace: (place: IPlace) => dispatch(addPlace(place)),
    onUpdatePlace: (place: IPlace) => dispatch(updatePlace(place)),
    onAddTransition: (transition: ITransition) => dispatch(addTransition(transition)),
    onUpdateTransition: (transition: ITransition) => dispatch(updateTransition(transition)),
    onDrawIncomingArc: (incomingArcDrawer: IIncomingArcDrawer) => (drawIncomingArc(incomingArcDrawer)),
    onDrawOutgoingArc: (outgoingArcDrawer: IOutgoingArcDrawer) => (drawOutgoingArc(outgoingArcDrawer)),
  };
};

export default connect(mapStateToProps, mapDispathToProps)<IProps>(PNetDesigner);
