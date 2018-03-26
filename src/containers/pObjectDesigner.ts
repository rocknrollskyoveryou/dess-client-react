import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// Types
import { IStoreState } from '../types';
import { IPlace, ITransition } from '../types/petriNet';

// Dumb component
import PObjectDesigner, { IProps } from '../components/PObjectDesigner';

// Redux actions
import { IPObjectAction, addPlace, addTransition } from '../actions';

const mapStateToProps = ({ petriObject }: IStoreState) => {
  return {
    petriObject,
  };
};

const mapDispathToProps = (dispatch: Dispatch<IPObjectAction>) => {
  return {
    onAddPlace: (place: IPlace) => dispatch(addPlace(place)),
    onAddTransition: (transition: ITransition) => dispatch(addTransition(transition)),
  };
};

export default connect(mapStateToProps, mapDispathToProps)<IProps>(PObjectDesigner);
