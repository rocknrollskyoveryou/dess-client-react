import * as React from 'react';
import * as d3 from 'd3';
import { ITransition } from '../types/petriNet';

class Transition extends React.Component<{ node: ITransition }, {}> {
    ref: SVGGElement;

    componentDidMount() {
        d3.select(this.ref).data([this.props.node]);
    }

    render() {
        const { id, label, x, y } = this.props.node;

        return (
            <g
                className="transition"
                transform={`translate(${x}, ${y})`}
                ref={(ref: SVGGElement) => this.ref = ref}
            >
                <rect
                    rx="3"
                    ry="3"
                    width={18}
                    height={72}
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

export default class Transitions extends React.Component<{nodes: ITransition[]}, {}> {
  
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

        function onDrag() {
            d3.select(this).attr('transform', function(d: any) {
                d.x += d3.event.dx;
                d.y += d3.event.dy;
                return 'translate(' + d.x + ',' + d.y + ')';
            });
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