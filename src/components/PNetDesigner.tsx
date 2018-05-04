import * as React from 'react';
import * as d3 from 'd3';
import { compose } from 'recompose';

// Types
import { IPetriNet, IPlace, ITransition, IArc, IArcDrawer } from '../types/petriNet';
import { IClasses } from '../types';

// Material-ui components
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import { withStyles, Theme, StyleRules } from 'material-ui/styles';

import DesignerView from './DesignerView';
import Places from './Places';
import Transitions from './Transitions';
import Arcs from './Arcs';
import * as actions from '../actions';
import ParamsView from './ParamsView';
import { Divider, Collapse } from 'material-ui';

export interface IProps {
    petriNet: IPetriNet;
    classes: IClasses;
    onSelectPlace: (index: number) => actions.ISelectPlace;
    onAddPlace: (place: IPlace) => actions.IAddPlace;
    onUpdatePlace: (place: IPlace) => actions.IUpdatePlace;
    onSelectTransition: (index: number) => actions.ISelectTransition;
    onAddTransition: (transition: ITransition) => actions.IAddTransition;
    onUpdateTransition: (transition: ITransition) => actions.IUpdateTransition;
    onSelectArc: (index: number) => actions.ISelectArc;
    onAddArc: (arc: IArc) => actions.IAddArc;
    onDrawArc: (arcDrawer: IArcDrawer) => actions.IDrawArc;
}

class PNetDesigner extends React.Component<IProps> {

    public render(): JSX.Element {
        const {
            petriNet,
            onSelectPlace, onUpdatePlace, 
            onSelectTransition, onUpdateTransition,
            onSelectArc, onAddArc,
            onDrawArc,
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
                    
                        <List
                            subheader={<ListSubheader component="div">Models</ListSubheader>}
                        >
                            <ListItem button={true}>
                                <ListItemIcon>
                                    <Icon>view_module</Icon>
                                </ListItemIcon>
                                <ListItemText primary="My Model" />
                                <Icon>expand_less</Icon>
                            </ListItem>
                            <Collapse in={true} timeout="auto" unmountOnExit={true}>
                                <List component="div" disablePadding={true}>
                                    <ListItem button={true} style={{ paddingLeft: 32 }}>
                                        <ListItemIcon>
                                            <Icon>settings</Icon>
                                        </ListItemIcon>
                                        <ListItemText inset={true} primary="New Petri Object" />
                                    </ListItem>
                                    <ListItem button={true} style={{ paddingLeft: 32 }}>
                                        <ListItemIcon>
                                            <Icon>settings</Icon>
                                        </ListItemIcon>
                                        <ListItemText inset={true} primary="Petri Object 1" />
                                    </ListItem>
                                </List>
                            </Collapse>
                        </List>
                    <Divider />
                    <List
                        subheader={<ListSubheader component="div">Petri Nets</ListSubheader>}
                    >
                        <ListItem button={true}>
                            <ListItemIcon>
                                <Icon>share</Icon>
                            </ListItemIcon>
                            <ListItemText primary="New Petri Net" />
                        </ListItem>
                    </List>                
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <DesignerView
                        onUpdatePlace={onUpdatePlace}
                        onUpdateTransition={onUpdateTransition}
                        onSelectPlace={onSelectPlace}
                        onSelectTransition={onSelectTransition}
                        onAddArc={onAddArc}
                        onDrawArc={onDrawArc}
                        arcDrawer={petriNet.arcDrawer}
                    >
                        <Places
                            places={petriNet.places}
                            selectedIdx={petriNet.selectedPlaceIdx}
                        />
                        <Transitions
                            transitions={petriNet.transitions}
                            selectedIdx={petriNet.selectedTransitionIdx}
                        />
                        <Arcs
                            petriNet={petriNet}
                            onSelect={onSelectArc}
                        />
                    </DesignerView> 
                    <ParamsView transition={petriNet.transitions[1]} />
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
    width: 320,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

export default withStyles(styles)(PNetDesigner);