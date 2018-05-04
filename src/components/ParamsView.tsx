import * as React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import { withStyles, Theme, StyleRules, WithStyles } from 'material-ui/styles';

import { ITransition } from '../types/petriNet';
import { IClasses } from '../types';
import { MenuItem } from 'material-ui';

export interface IProps {
    transition: ITransition;
    classes?: IClasses;
}

class ParamsView extends React.Component<IProps & WithStyles<'root' | 'textField'>> {
    public state: ITransition = {
        ...this.props.transition,
    };

    public render(): JSX.Element {
        const { classes, transition } = this.props;
        const { distribution, isPublic, isImportant } = this.state;

        return (
            <Paper className={classes.root}>
                <TextField
                    label="Name"
                    className={classes.textField}
                    value={transition.label}
                    margin="normal"
                />
                <FormGroup row={true}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isPublic}
                                onChange={this.handleChange('isPublic')}
                                value="isPublic"
                            />
                        }
                        label="Public"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isImportant}
                                onChange={this.handleChange('isImportant')}
                                value="isImportant"
                            />
                        }
                        label="Important"
                    />
                </FormGroup>
                <TextField
                    label="Priority"
                    className={classes.textField}
                    value={transition.priority}
                    margin="normal"
                />
                <TextField
                    label="Param"
                    className={classes.textField}
                    value={transition.param}
                    margin="normal"
                />
                <TextField
                    label="Param Deviation"
                    className={classes.textField}
                    value={transition.paramDeviation}
                    margin="normal"
                />
                <TextField
                    id="distribution-type"
                    select={true}
                    label="Type"
                    className={classes.textField}
                    value={distribution}
                    margin="normal"
                    onChange={this.handleChange('distribution')}
                >
                    <MenuItem key="distribution-type" value="none">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem key="distribution_type-0" value="exp">Exp</MenuItem>
                    <MenuItem key="distribution_type-1" value="normal">Normal</MenuItem>
                </TextField>

            </Paper>
        );
    }

    private handleChange = field => e => {
        const state = { ...this.state };
        state[field] = field === 'isPublic' || field === 'isImportant' ? e.target.checked : e.target.value;
        // state[field] = e.target.value;
        this.setState({ ...state });
    }
}

const styles = (theme: Theme): StyleRules => ({
    root: {
        width: 250,
        position: 'absolute',
        right: theme.spacing.unit * 2,
        top: 64 + theme.spacing.unit * 2,
        padding: 16,
    },
    textField: {
        width: '100%',
    },
  });

export default withStyles(styles)<IProps>(ParamsView);
