import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// Types
import { IStoreState } from '../types';
import { IPetriNetElement, IArcDrawer, IArc } from '../types/petriNet';

// Dumb component
import PNetDesigner from '../components/PNetDesigner';

// Redux actions
import * as actions from '../actions';

const mapStateToProps = ({ petriNet }: IStoreState) => {
  return {
    petriNet,
  };
};

const mapDispathToProps = (dispatch: Dispatch<actions.IPetriNetAction>) => {
  return {
    onSelectElement: (index: number) => dispatch(actions.selectElement(index)),
    onReleaseElement: () => dispatch(actions.releaseElement()),
    onAddElement: (element: IPetriNetElement) => dispatch(actions.addElement(element)),
    onUpdateElement: (element: IPetriNetElement) => dispatch(actions.updateElement(element)),
    onAddArc: (arc: IArc) => dispatch(actions.addArc(arc)),
    onSelectArc: (index: number) => dispatch(actions.selectArc(index)),
    onDrawArc: (arcDrawer: IArcDrawer | undefined) => dispatch(actions.drawArc(arcDrawer)),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(PNetDesigner);
