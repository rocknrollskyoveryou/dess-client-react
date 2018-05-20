import * as React from 'react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/icon';
import { withStyles, WithStyles, Theme, StyleRules } from '@material-ui/core/styles';

import { IResourceViewModel, IResourceViewPetriNet } from '../types/petriNet';

const style = (theme: Theme): StyleRules => ({
  root: {
    position: 'relative' as 'relative',
    width: 320,
  },
  header: theme.mixins.toolbar,
});

interface IProps {
  models?: Array<IResourceViewModel>;
  petriNets?: Array<IResourceViewPetriNet>;
}

type PropsWithStyles = IProps & WithStyles<'root' | 'header'>;

const ResourceView: React.SFC<PropsWithStyles> = ({
  classes,
  ...props
}: PropsWithStyles) => {
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.root,
      }}
    >
      <div className={classes.header} />

      <List
        subheader={<ListSubheader component="div">Models</ListSubheader>}
      >
        <ListItem button={true}>
          <ListItemIcon>
            <Icon>settings</Icon>
          </ListItemIcon>
          <ListItemText inset={true} primary="New Petri Object" />
        </ListItem>
        <ListItem button={true}>
          <ListItemIcon>
            <Icon>settings</Icon>
          </ListItemIcon>
          <ListItemText inset={true} primary="Petri Object 1" />
        </ListItem>
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
  );
};
