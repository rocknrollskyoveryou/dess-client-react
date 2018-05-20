import * as React from 'react';
import * as d3 from 'd3';

import { IPetriNetElement, PetriNetElementType, IPlaceParams, ITransitionParams } from '../types/petriNet';

import {
  UI_TRANS_WIDTH, UI_TRANS_HEIGHT, 
  UI_PLACE_RADIUS, 
  UI_ELEMENT_FILL, UI_ELEMENT_STROKE, 
  UI_SELECTED_ELEMENT_FILL, UI_SELECTED_ELEMENT_STROKE
} from '../constants';

export default class Element extends React.Component<{ element: IPetriNetElement, index: number, selected: boolean }> {
  ref: SVGGElement;

  public componentDidMount(): void {
    d3.select(this.ref).datum(this.props.element);
  }

  public render(): JSX.Element | null {
    const { index, selected } = this.props;
    const { type, ui, params } = this.props.element;
    const { x, y } = ui;

    let fill = selected ? UI_SELECTED_ELEMENT_FILL : UI_ELEMENT_FILL;
    let stroke = selected ? UI_SELECTED_ELEMENT_STROKE : UI_ELEMENT_STROKE;

    if (params && type === PetriNetElementType.Place) {
      const { mark, label } = params as IPlaceParams;
      return this.renderPlace(mark, label, x, y, fill, stroke, index);
    } else if (params && type === PetriNetElementType.Transition) {
      const { label } = params as ITransitionParams;
      return this.renderTransition(label, x, y, fill, stroke, index);
    } else {
      return null;
    }
  }

  private renderPlace(mark: number,
                      label: string,
                      x: number,
                      y: number,
                      fill: string,
                      stroke: string,
                      index: number): JSX.Element {
    return (
      <g
        data-index={index}
        className="element"
        transform={`translate(${x}, ${y})`}
        ref={(ref: SVGGElement) => this.ref = ref}
      >
        <circle
          r={UI_PLACE_RADIUS}
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

  private renderTransition(label: string,
                           x: number,
                           y: number,
                           fill: string,
                           stroke: string,
                           index: number): JSX.Element {
    return (
      <g
        data-index={index}
        className="element"
        transform={`translate(${x - UI_TRANS_WIDTH / 2}, ${y - UI_TRANS_HEIGHT / 2})`}
        ref={(ref: SVGGElement) => this.ref = ref}
      >
        <rect
          rx="3"
          ry="3"
          width={UI_TRANS_WIDTH}
          height={UI_TRANS_HEIGHT}
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