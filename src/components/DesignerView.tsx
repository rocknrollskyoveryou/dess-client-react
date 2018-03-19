import * as React from 'react';
import * as d3 from 'd3';

import { withStyles, Theme, StyleRules, WithStyles } from 'material-ui/styles';
import { IClasses } from '../types';
import { compose } from 'redux';

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
