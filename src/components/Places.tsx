import * as React from 'react';
import * as d3 from 'd3';
import { IPlace } from '../types/petriNet';

class Place extends React.Component<{ data: IPlace, index: number, selected: boolean }> {
    ref: SVGGElement;

    public componentDidMount(): void {
        const { data, index } = this.props;

        d3.select(this.ref).datum(data);
    }

    public render(): JSX.Element {
        const { index } = this.props;
        const { id, mark, label, x, y } = this.props.data;

        let fill = '#fff';
        let stroke = '#757575';
        if (this.props.selected) {
            fill = '#9FA8DA';
            stroke = '#3F51B5';
        }

        return (
            <g
                data-index={index}
                className="place"
                transform={`translate(${x}, ${y})`}
                ref={(ref: SVGGElement) => this.ref = ref}
            >
                <circle
                    r={36}
                    fill={fill}
                    stroke={stroke}
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

export default class Places extends React.Component<{places: IPlace[], selectedIdx: number}> {
  
    public render(): JSX.Element {
        const { places, selectedIdx } = this.props;

        const nodes = places.map((data: IPlace, index: number) => {
            return (
                <Place
                    key={index}
                    data={data}
                    index={index}
                    selected={selectedIdx === index}
                />);
        });

        return (
            <g className="places">
                {nodes}
            </g>
        );
    }
}