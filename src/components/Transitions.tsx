import * as React from 'react';
import * as d3 from 'd3';
import { ITransition } from '../types/petriNet';

class Transition extends React.Component<{ data: ITransition }, {}> {
    ref: SVGGElement;

    public componentDidMount(): void {
        d3.select(this.ref).data([this.props.data]);
    }

    public render(): JSX.Element {
        const { id, label, x, y, width, height, priority } = this.props.data;

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

export default class Transitions extends React.Component<
{data: ITransition[], onDrag?: (transition: ITransition) => void}, {}> {
  
    public componentDidMount(): void {
        const onUpdateTransition = this.props.onDrag;

        d3.selectAll('.transition')
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

        function onDrag(d: ITransition) {
            d.x += d3.event.dx;
            d.y += d3.event.dy;
            if (onUpdateTransition) {
                onUpdateTransition(d);
            }
            // d3.select(this)
            //     .attr('transform', function(d: any) {
            //         d.x += d3.event.dx;
            //         d.y += d3.event.dy;
            //         if (onUpdateTransition) {
            //             onUpdateTransition(d);
            //         }
            //         return 'translate(' + d.x + ',' + d.y + ')';
            //     });
        }
    }
  
    public render(): JSX.Element {
        const nodes = this.props.data.map((data: ITransition, index: number) => {
            return <Transition key={index} data={data} />;
        });

        return (
            <g className="transitions">
                {nodes}
            </g>
        );
    }
}