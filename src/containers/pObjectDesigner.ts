import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// Types
import { IStoreState } from '../types';
import { IPosition, ITransition } from '../types/petriNet';

// Dumb component
import PObjectDesigner, { IProps } from '../components/PObjectDesigner';

// Redux actions
import { IPObjectAction, addPosition, addTransition } from '../actions';

const mapStateToProps = ({ petriObject }: IStoreState) => {
  return {
    petriObject,
  };
};

const mapDispathToProps = (dispatch: Dispatch<IPObjectAction>) => {
  return {
    onAddPosition: (position: IPosition) => dispatch(addPosition(position)),
    onAddTransition: (transition: ITransition) => dispatch(addTransition(transition)),
  };
};

export default connect(mapStateToProps, mapDispathToProps)<IProps>(PObjectDesigner);
