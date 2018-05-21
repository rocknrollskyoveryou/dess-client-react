import * as React from 'react';
import * as d3 from 'd3';
import { IArc, IPetriNet, IPetriNetElement, PetriNetElementType, IArcParams } from '../types/petriNet';
import { UI_PLACE_RADIUS, UI_TRANS_WIDTH, UI_SELECTED_ELEMENT_STROKE } from '../constants';

interface IMouseCoords {
  mouseX: number;
  mouseY: number;
}

interface ID3Arc {
  source: IPetriNetElement;
  target?: IPetriNetElement;
  targetCoords?: IMouseCoords;
  index?: number;
  selected?: boolean;
  params?: IArcParams;
}

interface ICurve {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  midX: number;
  midY: number;
}

class Arc extends React.Component<ID3Arc> {
  private ref: SVGPathElement;

  public render(): JSX.Element {
    const { index, selected, params } = this.props;
    const { x0, y0, x1, y1, midX, midY } = this.calcPath();
    const angle = Math.atan2(y1 - y0, x1 - x0);
    const dist = 7;
    const quantX = Math.sin(angle) * dist;
    const quantY = Math.cos(angle) * dist;

    const stroke = selected ? UI_SELECTED_ELEMENT_STROKE : '#616161';

    return (
      <g
        data-index={index}
        className="arc"
        ref={(ref: SVGPathElement) => this.ref = ref}
      >
        {params && <g>
          <path
            d={`M${quantX + midX} ${-quantY + midY}, 
            L${-quantX + midX} ${quantY + midY}`}
            fill="none"
            stroke={stroke}
            strokeWidth="2"
          />
          <text
            className="mark"
            fontFamily="Roboto"
            fontSize="18"
            x={midX}
            y={-quantY * 2 + midY}
            fill="rgba(0, 0, 0, 0.54)"
          >
            {params.quantity}
          </text>
        </g>}
        <path
          d={`M${x0},${y0} C${midX},${y0} ${midX},${y1} ${x1},${y1}`}
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          markerEnd="url(#end-arrow)"
        />
        <path
          d={`M${x0},${y0} C${midX},${y0} ${midX},${y1} ${x1},${y1}`}
          fill="none"
          stroke="#000"
          strokeOpacity="0"
          strokeWidth="30"
        />
      </g>
    );
  }

  private calcPath(): ICurve {
    const { source, target, targetCoords } = this.props;

    const curve: ICurve = {
      x0: 0,
      y0: source.ui.y,
      x1: 0,
      y1: 0,
      midX: 0,
      midY: 0,
    };

    const sourceWidth = this.calcElementWidth(source);
    
    if (target) {
      curve.y1 = target.ui.y;

      const targetWidth = this.calcElementWidth(target);

      const dx = target.ui.x - source.ui.x;

      if (dx >= 0) {
        curve.x0 = source.ui.x + sourceWidth / 2 + 5;
        curve.x1 = target.ui.x - targetWidth / 2 - 9;
      } else {
        curve.x0 = source.ui.x - sourceWidth / 2 - 5;
        curve.x1 = target.ui.x + targetWidth / 2 + 9;
      }
    } else if (targetCoords) {
      curve.y1 = targetCoords.mouseY;

      const dx = targetCoords.mouseX - source.ui.x;

      if (dx >= 0) {
        curve.x0 = source.ui.x + sourceWidth / 2 + 5;
        curve.x1 = targetCoords.mouseX - 9;
      } else {
        curve.x0 = source.ui.x - sourceWidth / 2 - 5;
        curve.x1 = targetCoords.mouseX + 9;
      }
    }

    curve.midX = (curve.x0 + curve.x1) / 2;
    curve.midY = (curve.y0 + curve.y1) / 2;

    return curve;
  }

  private calcElementWidth(element: IPetriNetElement) {
    return element.type === PetriNetElementType.Place ? UI_PLACE_RADIUS * 2 : UI_TRANS_WIDTH;
  }
}

export default class Arcs extends React.Component<{ petriNet: IPetriNet, onSelect: (index: number) => void }> {
  public render(): JSX.Element {
    const { arcs } = this.props.petriNet;

    return (
      <g className="arcs">
        {arcs.map(this.renderArc)}
        {this.renderArcDrawer()}
      </g>
    );
  }

  private renderArc = (arc: IArc, index: number): JSX.Element | null => {
    const { elements, ui: { selectedArcIdx } } = this.props.petriNet;

    const source = elements.find((e: IPetriNetElement) => { return e.id === arc.source; });
    const target = elements.find((e: IPetriNetElement) => { return e.id === arc.target; });

    if (source && target) {
      return <Arc key={index} index={index} selected={index === selectedArcIdx} source={source} target={target} />;
    }

    return null;
  }

  private renderArcDrawer(): JSX.Element | null {
    const { ui: { arcDrawer, selectedArcIdx }, elements } = this.props.petriNet;

    if (arcDrawer) {
      const source = elements.find((e: IPetriNetElement) => { return e.id === arcDrawer.source.id; });

      if (source) {
        const targetCoords = {
          mouseX: arcDrawer.mouseX,
          mouseY: arcDrawer.mouseY,
        };

        return (
          <Arc source={source} targetCoords={targetCoords} />
        );
      }
    }

    return null;
  }
}
