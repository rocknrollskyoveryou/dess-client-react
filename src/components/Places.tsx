import * as React from 'react';
import * as d3 from 'd3';
import { IPlace } from '../types/petriNet';

class Place extends React.Component<{ node: IPlace }, {}> {
    ref: SVGGElement;

    componentDidMount() {
        d3.select(this.ref).data([this.props.node]);
    }

    render() {
        const { id, mark, label, x, y } = this.props.node;

        return (
            <g
                className="position"
                transform={`translate(${x}, ${y})`}
                ref={(ref: SVGGElement) => this.ref = ref}
            >
                <circle
                    r={36}
                    fill="#fff"
                    stroke="#757575"
                    strokeWidth="2"
                />
                <text
                    className="mark"
                    fontFamily="Roboto"
                    fontSize="18"
                    alignmentBaseline="central"
                    textAnchor="middle"
                    fill="rgba(0, 0, 0, 0.54)"
                >
                    {mark}
                </text>
                <text
                    y={54}
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

export default class Places extends React.Component<{nodes: IPlace[]}, {}> {
  
    public componentDidMount(): void {
        
        d3.selectAll('.position')
            .call(d3.drag()
            .on('drag', onDrag));

        function onMouseEnter() {
            d3.select(this)
                .transition()
                    .duration(150)
                    .attr('transform', function(d: any) {
                        return 'translate(' + d.x + ',' + d.y + ')scale(1.1)';
                    });
                
        }

        function onMouseLeave() {
            d3.select(this)
                .transition()
                    .duration(150)
                    .attr('transform', function(d: any) {
                        return 'translate(' + d.x + ',' + d.y + ')scale(1)';
                    });
        }

        function onDrag() {
            d3.select(this)
                .attr('transform', function(d: any) {
                    d.x += d3.event.dx;
                    d.y += d3.event.dy;
                    return 'translate(' + d.x + ',' + d.y + ')';
                });
        }
    }
  
    public render(): JSX.Element {
        const nodes = this.props.nodes.map((node: IPlace, index: number) => {
            return <Place key={index} node={node} />;
        });

        return (
            <g className="positions">
                {nodes}
            </g>
        );
    }
}