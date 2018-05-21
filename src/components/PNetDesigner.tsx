import * as React from 'react';
import * as d3 from 'd3';
import { compose } from 'recompose';

// Types
import { IPetriNet, IPetriNetElement, IArc, IArcDrawer } from '../types/petriNet';

// Material-ui components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { withStyles, Theme, StyleRules, WithStyles } from '@material-ui/core/styles';

import * as actions from '../actions';

import DesignerView from './DesignerView';
import Elements from './Elements';
import Arcs from './Arcs';
import ParamsView from './ParamsView';
import ResourceView from './ResourceView';

const styles = (theme: Theme): StyleRules => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minWidth: 0, // So the Typography noWrap works
    marginTop: 64,
  },
  toolbar: theme.mixins.toolbar,
});

interface IProps {
  petriNet: IPetriNet;
  onReleaseElement: () => actions.IReleaseElement;
  onSelectElement: (index: number) => actions.ISelectElement;
  onAddElement: (element: IPetriNetElement) => actions.IAddElement;
  onUpdateElement: (element: IPetriNetElement) => actions.IUpdateElement;
  onAddArc: (arc: IArc) => actions.IAddArc;
  onSelectArc: (index: number) => actions.ISelectArc;
  onDrawArc: (arcDrawer: IArcDrawer | undefined) => actions.IDrawArc;
}

type PropsWithStyles = IProps & WithStyles<'root' | 'appBar' | 'content' | 'toolbar'>;

class PNetDesigner extends React.Component<PropsWithStyles> {

  public render(): JSX.Element {
    const {
      petriNet,
      onSelectElement, onReleaseElement, onUpdateElement,
      onSelectArc, onAddArc,
      onDrawArc,
      classes
    } = this.props;

    const selectedElement = petriNet.elements[petriNet.ui.selectedElementIdx];

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap={true}>
              DESS
            </Typography>
          </Toolbar>
        </AppBar>
        <ResourceView />
        <main className={classes.content}>
          {/* <div className={classes.toolbar} /> */}
          <DesignerView
            onReleaseElement={petriNet.ui.selectedElementIdx !== -1 ? onReleaseElement : undefined}
            onSelectElement={onSelectElement}
            onUpdateElement={onUpdateElement}
            onAddArc={onAddArc}
            onSelectArc={onSelectArc}
            onDrawArc={onDrawArc}
            arcDrawer={petriNet.ui.arcDrawer}
          >
            <Elements
              elements={petriNet.elements}
              selectedIdx={petriNet.ui.selectedElementIdx}
            />
            <Arcs
              petriNet={petriNet}
              onSelect={onSelectArc}
            />
          </DesignerView>
          {selectedElement && <ParamsView element={selectedElement} />}
        </main>
      </div>
    );
  }
}

export default withStyles(styles)<IProps>(PNetDesigner);