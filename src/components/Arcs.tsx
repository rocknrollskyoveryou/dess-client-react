import * as React from 'react';
import * as d3 from 'd3';
import { IArc, IPosition, ITransition } from '../types/petriNet';

interface ID3Arc {
    source: IPosition;
    target: ITransition;
}

class Arc extends React.Component<ID3Arc, {}> {
    private ref: SVGPathElement;
  
    private linkRadial = d3.linkHorizontal()
        .x(function(d: any) { return d[0]; })
        .y(function(d: any) { return d[1]; });

    public componentDidMount(): void {
        this.updatePosition(this.props);
    }

    public componentWillReceiveProps(nextProps: ID3Arc): void {
        this.updatePosition(nextProps);
    }
  
    public render(): JSX.Element {
        return(
            <path
                className="arc"
                ref={(ref: SVGPathElement) => this.ref = ref}
                fill="none"
                stroke="#000"
                strokeOpacity="0.54"
                strokeWidth={1 + this.props.target.priority}
                markerEnd="url(#end-arrow)"
            />
        );
    }

    private updatePosition(pos: ID3Arc): void {
        const { source, target } = this.props;

        let x0: number = source.x, x1: number = target.x;

        const dx = target.x - source.x;
        if (dx >= 0) {
            x0 += source.width / 2 + 5;
            x1 -= target.width / 2 + 9;
        } else {
            x0 -= source.width / 2 + 5;
            x1 += target.width / 2 + 9;
        }

        const arc = {
            source: [x0, source.y],
            target: [x1, target.y],
        };
        d3.select(this.ref)
            .data([arc])
            .attr('d', this.linkRadial);
    }
}

interface IProps {
    nodes: IArc[];
    positions: IPosition[];
    transitions: ITransition[];
}

export default class Arcs extends React.Component<IProps, {}> {
    public render(): JSX.Element {
        const arcs: Array<JSX.Element | null> = this.props.nodes.map((arc: IArc, index: number) => {
            const source = this.props.positions.find((e: IPosition) => { return e.id === arc.source; });
            const target = this.props.transitions.find((e: ITransition) => { return e.id === arc.target; });
            if (source && target) {
                return <Arc key={index} source={source} target={target}/>;
            } else {
                return null;
            }
        });

        return (
            <g className="arcs">
                {arcs}
            </g>
        );
    }
}