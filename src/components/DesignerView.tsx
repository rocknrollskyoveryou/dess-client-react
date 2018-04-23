import * as React from 'react';
import * as d3 from 'd3';

import { withStyles, Theme, StyleRules, WithStyles } from 'material-ui/styles';
import { IClasses } from '../types';
import { compose } from 'redux';
import { IPlace, ITransition, IArcDrawer, IArc } from '../types/petriNet';
import {
    IAddPlace, IUpdatePlace, IAddTransition, IUpdateTransition, IDrawArc, IPetriNetUpdateAction, IAddArc
} from '../actions';

interface IDefaultProps {
    gridSize: number;
    gridSpacing: number;
    gridDot: number;
}

interface IProps {
    classes?: IClasses;
    gridSize?: number;
    gridSpacing?: number;
    gridDot?: number;
    arcDrawer?: IArcDrawer;
    onAddPlace?: (place: IPlace) => IAddPlace;
    onUpdatePlace?: (place: IPlace) => IUpdatePlace;
    onAddTransition?: (transition: ITransition) => IAddTransition;
    onUpdateTransition?: (transition: ITransition) => IUpdateTransition;
    onAddArc: (arc: IArc) => IAddArc;
    onDrawArc: (arcDrawer: IArcDrawer) => IDrawArc;
}

class DesignerView extends React.Component<IProps & WithStyles<'root' | 'svg'>> {
    public static defaultProps: IDefaultProps = {
        gridSize: 40960,
        gridSpacing: 36,
        gridDot: 1,
    };

    // SVG Petri net container
    private view: SVGGElement;

    // SVG Petri net entities
    private entities: SVGGElement;

    public componentDidMount(): void {

        d3.selectAll('.place')
            .on('mousedown', this.onPlaceMouseDown)
            .on('mouseup', this.addArc)
            .call(d3.drag()
            .filter(() => this.props.arcDrawer === undefined)
            .on('drag', this.onPlaceDrag));

        d3.selectAll('.transition')
            .on('mousedown', this.onTransitionMouseDown)
            .on('mouseup', this.addArc)
            .call(d3.drag()
            .filter(() => this.props.arcDrawer === undefined)
            .on('drag', this.onTransitionDrag));

        d3.select(this.view)
            .on('mousemove', this.onViewMouseMove)
            .on('mouseup', this.onViewMouseUp);
    }

    public render(): JSX.Element {
        const { classes, children } = this.props;

        return(
            <div className={classes.root}>
                <svg className={classes.svg}>
                    {this.renderDefs()}
                    <g className={classes.view} ref={(el: SVGGElement) => this.view = el}>
                        {this.renderBackground()}
                        <g ref={(el: SVGGElement) => this.entities = el}>
                            {children}
                        </g>
                    </g>
                </svg>
            </div>
        );
    }

    private renderBackground(): JSX.Element {
        const { classes } = this.props;
        const { gridSize } = this.props as IDefaultProps;
        return (
            <rect  
                className={classes.background} 
                x={-gridSize / 4}
                y={-gridSize / 4}
                width={gridSize}
                height={gridSize}
                fill="url(#grid)"
            />
        );
    }

    private renderDefs(): JSX.Element {
        const { classes } = this.props;
        const { gridSpacing, gridDot } = this.props as IDefaultProps;
        return(
            <defs>
                <marker 
                    id="end-arrow"
                    key="end-arrow"
                    viewBox="0 -3 6 6"
                    refX="3"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto"
                >
                    <path
                        fill="#757575"
                        d="M0,-3L6,0L0,3"
                    />
                </marker>

                <pattern 
                    id="grid"
                    key="grid"
                    width={gridSpacing}
                    height={gridSpacing}
                    patternUnits="userSpaceOnUse"
                >
                    <circle
                        cx={gridSpacing / 2}
                        cy={gridSpacing / 2}
                        r={gridDot}
                        fill="lightgray"
                    />
                </pattern>

                <filter id="dropshadow" key="dropshadow" height="130%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                    <feOffset dx="2" dy="2" result="offsetblur"/>
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.1"/>
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>   
        );
    }

    private drawArc = (arc: IArcDrawer) => {
        if (this.props.onDrawArc) {
            this.props.onDrawArc(arc);
        }
    }

    private addArc = (target: IPlace | ITransition): void => {
        const { arcDrawer } = this.props;
        if (arcDrawer) {
            const arc = {
                source: arcDrawer.source,
                target: target.id,
                isIncoming: arcDrawer.isIncoming,
            };
            
            this.props.onAddArc(arc);
        }
    }

    private moveElement = (el: IPlace | ITransition,
                           callback: (el: IPlace | ITransition) => IPetriNetUpdateAction) => {
        if (!d3.event.shiftKey) {
            el.x += d3.event.dx;
            el.y += d3.event.dy;
            callback(el);
        }
    }

    // View event listeners
    
    private onViewMouseMove = () => {
        d3.event.preventDefault();
        const { arcDrawer } = this.props;
        if (arcDrawer) {
            this.drawArc({
                ...arcDrawer,
                mouseX: d3.event.offsetX,
                mouseY: d3.event.offsetY,
            });
        } else {
            return;
        }
    }

    private onViewMouseUp = (d: any) => {
        if (this.props.arcDrawer) {
            this.drawArc(undefined);
        }
    }

    // Place event listeners

    private onPlaceDrag = (d: IPlace): void => {
        if (this.props.onUpdatePlace) {
            this.moveElement(d, this.props.onUpdatePlace);
        }
    }

    private onPlaceMouseDown = (d: IPlace): void => {
        if (d3.event.shiftKey) {
            this.drawArc({ source: d.id, mouseX: d.x, mouseY: d.y, isIncoming: true });
        }
    }

    // Transition event listeners

    private onTransitionDrag = (d: ITransition): void => {
        if (this.props.onUpdateTransition) {
            this.moveElement(d, this.props.onUpdateTransition);
        }
    }

    private onTransitionMouseDown = (d: ITransition): void => {
        if (d3.event.shiftKey) {
            this.drawArc({ source: d.id, mouseX: d3.event.x, mouseY: d3.event.y, isIncoming: false });
        }
    }
}

const styles = (theme: Theme): StyleRules => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    svg: {
        alignContent: 'stretch',
        flex: 1,
    }
});

export default withStyles(styles)<IProps>(DesignerView);
