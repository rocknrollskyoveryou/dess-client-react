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
        let fill = '#fff';
        let stroke = '#757575';
        if (id === 'transition-2') {
            fill = '#9FA8DA';
            stroke = '#3F51B5';
        }
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
                    fill={fill}
                    stroke={stroke}
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

export default class Transitions extends React.Component<{ data: ITransition[] }, {}> {
  
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