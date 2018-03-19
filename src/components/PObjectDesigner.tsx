import * as React from 'react';
import { compose } from 'recompose';

// Types
import { IPetriObject, IPosition, ITransition } from '../types/petriNet';
import { IClasses } from '../types';

// Material-ui components
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withStyles, Theme, StyleRules } from 'material-ui/styles';

import DesignerView from './DesignerView';
import Positions from './Positions';
import Transitions from './Transitions';
import Arcs from './Arcs';
import { IAddPosition, IAddTransition } from '../actions';

const positions: IPosition[] = [
    {
        id: 1,
        mark: 1,
        label: 'There are two major issues',
        x: 100,
        y: 100,
    },
];

const transitions: ITransition[] = [
    {
        id: 1,
        label: 'Transition 1',
        x: 200,
        y: 200,
    },
];

export interface IProps {
  petriObject: IPetriObject;
  classes: IClasses;
  onAddPosition: (position: IPosition) => IAddPosition;
  onAddTransition: (transition: ITransition) => IAddTransition;
}

const PObjectDesigner: React.StatelessComponent<IProps> = (props) => {
    const { classes } = props;

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
            <DesignerView>
                <Positions nodes={positions} />
                <Transitions nodes={transitions} />
                <Arcs />
            </DesignerView>    
        </main>
    </div>
    );
};

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

export default withStyles(styles)(PObjectDesigner);