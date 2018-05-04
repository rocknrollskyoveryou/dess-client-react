import * as React from 'react';
import * as d3 from 'd3';
import { ITransition } from '../types/petriNet';

class Transition extends React.Component<{
    data: ITransition, index: number, selected: boolean
}> {
    ref: SVGGElement;

    public componentDidMount(): void {
        const { data, index } = this.props;

        d3.select(this.ref).datum(data);
    }

    public render(): JSX.Element {
        const { index } = this.props;
        const { id, label, x, y, width, height, priority } = this.props.data;
        
        // Choose color if selected
        let fill = '#fff';
        let stroke = '#757575';
        if (this.props.selected) {
            fill = '#9FA8DA';
            stroke = '#3F51B5';
        }

        return (
            <g
                data-index={index}
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

export default class Transitions extends React.Component<{ 
    transitions: ITransition[], selectedIdx: number,
}> {
  
    public render(): JSX.Element {
        const { transitions, selectedIdx } = this.props;

        const nodes = transitions.map((data: ITransition, index: number) => {
            return (
                <Transition
                    key={index}
                    data={data}
                    index={index}
                    selected={selectedIdx === index}
                />
            );
        });

        return (
            <g className="transitions">
                {nodes}
            </g>
        );
    }
}