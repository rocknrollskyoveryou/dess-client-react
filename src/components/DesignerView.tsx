import * as React from 'react';
import * as d3 from 'd3';

import { withStyles, Theme, StyleRules, WithStyles } from '@material-ui/core/styles';
import { IClasses } from '../types';
import { compose } from 'redux';
import { IPetriNetElement, IArcDrawer, IArc } from '../types/petriNet';
import {
    ISelectElement, IAddElement, IUpdateElement,
    IDrawArc, IPetriNetUpdateAction, IAddArc, IReleaseElement, ISelectArc, 
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
    onSelectElement?: (index: number) => ISelectElement;
    onReleaseElement?: () => IReleaseElement;
    onAddElement?: (element: IPetriNetElement) => IAddElement;
    onUpdateElement?: (element: IPetriNetElement) => IUpdateElement;
    onAddArc?: (arc: IArc) => IAddArc;
    onDrawArc?: (arcDrawer: IArcDrawer | undefined) => IDrawArc;
    onSelectArc?: (index: number) => ISelectArc;
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
        this.setEventListeners();
    }

    // public componentDidUpdate(): void {
    //     const { elements }
    //     this.setEventListeners();
    // }

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

    private setEventListeners() {
        d3.selectAll('.element')
            .on('mousedown', onElementMouseDown)
            .on('mouseup', this.addArc)
            .call(d3.drag()
                .filter(() => this.props.arcDrawer === undefined)
                .on('drag', this.onElementDrag));

        d3.selectAll('.arc')
            .on('mousedown', onArcMouseDown);

        const zoom = d3.zoom()
                    .scaleExtent([0.7, 1.3])
                    .on('zoom', this.handleZoom);

        d3.select(this.view)
            .on('mousemove', this.onViewTouchMove)
            .on('mousedown', this.onViewMouseDown)
            .on('mouseup', this.onViewMouseUp)
            .call(zoom);

        const { onSelectElement, onSelectArc, onDrawArc } = this.props;
        function onElementMouseDown(d: IPetriNetElement): void {
            if (onDrawArc && d3.event.shiftKey) {
                onDrawArc({ source: d, mouseX: d.ui.x, mouseY: d.ui.y });
            } else if (onSelectElement) {
                onSelectElement(+this.dataset.index);
            }
        }
        function onArcMouseDown(d: IPetriNetElement): void {
            if (onSelectArc) {
                onSelectArc(+this.dataset.index);
            }
        }
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

    private drawArc = (arc: IArcDrawer | undefined) => {
        if (this.props.onDrawArc) {
            this.props.onDrawArc(arc);
        }
    }

    private addArc = (target: IPetriNetElement): void => {
        const { arcDrawer, onAddArc } = this.props;
        if (arcDrawer) {
            const arc = {
                source: arcDrawer.source.id,
                target: target.id,
            };
            if (onAddArc && arcDrawer.source.type !== target.type) {
                onAddArc(arc);
            }
        }
    }

    private moveElement = (el: IPetriNetElement,
                           callback: (el: IPetriNetElement) => IPetriNetUpdateAction) => {
        if (!d3.event.shiftKey) {
            el.ui.x += d3.event.dx;
            el.ui.y += d3.event.dy;
            callback(el);
        }
    }

    // View event listeners
    
    private onViewTouchMove = () => {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        const { arcDrawer } = this.props;
        if (arcDrawer) {
            this.drawArc({
                ...arcDrawer,
                mouseX: d3.event.offsetX,
                mouseY: d3.event.offsetY,
            });
        }
        return;
    }

    private handleZoom = () => {
        // if (this.props.arcDrawer) { return; }
        d3.select(this.entities).attr('transform', d3.event.transform);
    }

    private onViewMouseUp = () => {
        if (this.props.arcDrawer) {
            this.drawArc(undefined);
        }
    }

    private onViewMouseDown = () => {
        if (this.props.onReleaseElement) {
            this.props.onReleaseElement();
        }
    }

    // Element event listeners

    private onElementDrag = (d: IPetriNetElement): void => {
        if (this.props.onUpdateElement) {
            this.moveElement(d, this.props.onUpdateElement);
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
