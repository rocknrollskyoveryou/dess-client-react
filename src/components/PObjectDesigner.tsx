import * as React from 'react';

// Types
import { IPetriObject, IPosition, ITransition } from '../types/petriNet';
import { IClasses } from '../types';

// Material-ui components
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withStyles, Theme, StyleRulesCallback } from 'material-ui/styles';
import { IAddPosition, IAddTransition } from '../actions';

export interface IProps {
  petriObject: IPetriObject;
  classes: IClasses;
  onAddPosition: (position: IPosition) => IAddPosition;
  onAddTransition: (transition: ITransition) => IAddTransition;
}

export function PObjectDesigner({classes, petriObject}: IProps) {
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
        {/* <Canvas /> */}
      </main>
    </div>
  );
}

const styles: StyleRulesCallback = (theme: Theme) => ({
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