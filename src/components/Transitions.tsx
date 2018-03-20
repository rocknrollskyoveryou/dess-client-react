import * as React from 'react';
import * as d3 from 'd3';
import { ITransition } from '../types/petriNet';

class Transition extends React.Component<{ node: ITransition }, {}> {
    ref: SVGGElement;

    public componentDidMount(): void {
        d3.select(this.ref).data([this.props.node]);
    }

    public render(): JSX.Element {
        const { id, label, x, y, width, height, priority } = this.props.node;

        return (
            <g
                className="transition"
                transform={`translate(${x - width / 2}, ${y - height / 2})`}
                ref={(ref: SVGGElement) => this.ref = ref}
            >
                <rect
                    rx="3"
                    ry="3"
                    width={width}
                    height={height}
                    fill="#fff"
                    stroke="#757575"
                    strokeWidth="2"
                />
                <text
                    x={9}
                    y={90}
                    className="label"
                    fontFamily="Roboto"
                    fontSize="14"
                    alignmentBaseline="central"
                    textAnchor="middle"
                    fill="rgba(0, 0, 0, 0.54)"
                >
                    {label}
                </text>
            </g>
        );
    }
}

export default class Transitions extends React.Component<{nodes: ITransition[], (d: ITransition): void}, {}> {
  
    public componentDidMount(): void {
        
        d3.selectAll('.transition')
            .call(d3.drag()
            .on('start', onDragStart)
            .on('drag', onDrag)
            .on('end', onDragEnd));

        function onDragStart(d: any) {
            d.fx = d.x;
            d.fy = d.y;
        }

        function onDrag(d: ITransition) {
            d.x += d3.event.dx;
            d.y += d3.event.dy;
            this.props.onDrag(d);
        }

        function onDragEnd(d: any) {
            d.fx = null;
            d.fy = null;
        }
    }
  
    public render(): JSX.Element {
        const nodes = this.props.nodes.map((node: ITransition, index: number) => {
            return <Transition key={index} node={node} />;
        });

        return (
            <g className="transitions">
                {nodes}
            </g>
        );
    }
}