import * as React from 'react';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, Theme, StyleRules, WithStyles } from '@material-ui/core/styles';

import {
    IPetriNetElement, IPlaceParams, ITransitionParams, PetriNetElementType, IElementParams
} from '../types/petriNet';

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

export interface IProps {
    element: IPetriNetElement;
}

type PropsWithStyles = IProps & WithStyles<'root' | 'textField'>;

class ParamsView extends React.Component<PropsWithStyles> {

    static getDerivedStateFromProps(nextProps: IProps, nextState: IPlaceParams | ITransitionParams) {
        
        return {
            ...nextProps.element.params,
        };
    }

    public render(): JSX.Element {
        const { classes, element } = this.props;
        const { label, isPublic, isImportant } = this.state as IElementParams;

        return (
            <Paper className={classes.root}>
                <TextField
                    label="Label"
                    className={classes.textField}
                    value={label}
                    margin="normal"
                    onChange={this.handleChange('label')}
                />
                {this.elementFields(element.type)}
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
            </Paper>
        );
    }

    private handleChange = field => e => {
        const state = { ...this.state };
        state[field] = field === 'isPublic' || field === 'isImportant' ? e.target.checked : e.target.value;
        // state[field] = e.target.value;
        this.setState({ ...state });
    }

    private elementFields(elementType: number): JSX.Element | null {
        if (elementType === PetriNetElementType.Place) {
            return this.renderPlaceForm();
        } else if (elementType === PetriNetElementType.Transition) {
            return this.renderTransitionForm();
        }
        return null;
    }

    private renderPlaceForm(): JSX.Element {
        const { classes } = this.props;
        const { mark } = this.state as IPlaceParams;
    
        return (
            <React.Fragment>
                
                <TextField
                    label="Mark"
                    className={classes.textField}
                    value={mark}
                    margin="normal"
                    onChange={this.handleChange('mark')}
                />

            </React.Fragment>
        );
    }

    private renderTransitionForm(): JSX.Element {
        const { classes } = this.props;
        const { priority, param, paramDeviation, distribution } = this.state as ITransitionParams;

        return (
            <React.Fragment>
                <TextField
                    label="Priority"
                    className={classes.textField}
                    value={priority}
                    margin="normal"
                    onChange={this.handleChange('priority')}
                />
                <TextField
                    label="Param"
                    className={classes.textField}
                    value={param}
                    margin="normal"
                    onChange={this.handleChange('param')}
                />
                <TextField
                    label="Param Deviation"
                    className={classes.textField}
                    value={paramDeviation}
                    margin="normal"
                    onChange={this.handleChange('paramDeviation')}
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
            </React.Fragment>    
        );
    }
}

export default withStyles(styles)<IProps>(ParamsView);
