import * as React from 'react';
import * as d3 from 'd3';
import { compose } from 'recompose';

// Types
import { IPetriNet, IPlace, ITransition, IArc, IIncomingArcDrawer, IOutgoingArcDrawer } from '../types/petriNet';
import { IClasses } from '../types';

// Material-ui components
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withStyles, Theme, StyleRules } from 'material-ui/styles';

import DesignerView from './DesignerView';
import Places from './Places';
import Transitions from './Transitions';
import Arcs from './Arcs';
import {
    IAddPlace, IUpdatePlace,
    IAddTransition, IUpdateTransition,
    IAddIncomingArc, IAddOutgoingArc,
    IDrawIncomingArc, IDrawOutgoingArc,
} from '../actions';

export interface IProps {
  petriNet: IPetriNet;
  classes: IClasses;
  onAddPlace: (place: IPlace) => IAddPlace;
  onUpdatePlace: (place: IPlace) => IUpdatePlace;
  onAddTransition: (transition: ITransition) => IAddTransition;
  onUpdateTransition: (transition: ITransition) => IUpdateTransition;
//   onAddIncomingArc: (arc: IArc) => IAddIncomingArc;
//   onAddOutgoingArc: (arc: IArc) => IAddOutgoingArc;
  onDrawIncomingArc: (incomingArcDrawer: IIncomingArcDrawer) => IDrawIncomingArc;
  onDrawOutgoingArc: (outgoingArcDrawer: IOutgoingArcDrawer) => IDrawOutgoingArc;
}

class PNetDesigner extends React.Component<IProps> {

    public render(): JSX.Element {
        const {
            petriNet,
            onUpdatePlace, onUpdateTransition,
            // onAddIncomingArc, onAddOutgoingArc,
            onDrawIncomingArc, onDrawOutgoingArc,
            classes
        } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="absolute" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="title" color="inherit" noWrap={true}>
                    DESS
                    </Typography>
                </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <DesignerView
                        onUpdatePlace={onUpdatePlace}
                        onUpdateTransition={onUpdateTransition}
                        // onAddIncomingArc={onAddIncomingArc}
                        // onAddOutgoingArc={onAddOutgoingArc}
                        // onDrawIncomingArc={onDrawIncomingArc}
                        // onDrawOutgoingArc={onDrawOutgoingArc}
                    >
                        <Places data={petriNet.places} />
                        <Transitions data={petriNet.transitions} />
                        <Arcs data={petriNet} />
                    </DesignerView>    
                </main>
            </div>
        );
    }
}

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
  drawerPaper: {
    position: 'relative',
    width: 240,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

export default withStyles(styles)(PNetDesigner);