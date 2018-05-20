import * as React from 'react';
import * as d3 from 'd3';
import { IArc, IPetriNet, IPetriNetElement, PetriNetElementType } from '../types/petriNet';
import { UI_PLACE_RADIUS, UI_TRANS_WIDTH } from '../constants';

interface IMouseCoords {
  mouseX: number;
  mouseY: number;
}

interface ID3Arc {
  source: IPetriNetElement;
  target?: IPetriNetElement;
  targetCoords?: IMouseCoords;
}

interface ICurve {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  midX: number;
}

class Arc extends React.Component<ID3Arc> {
  private ref: SVGPathElement;

  public render(): JSX.Element {
    const { x0, y0, x1, y1, midX } = this.calcPath();

    return (
      <path
        className="arc"
        ref={(ref: SVGPathElement) => this.ref = ref}
        d={`M${x0},${y0} C${midX},${y0} ${midX},${y1} ${x1},${y1}`}
        fill="none"
        stroke="#000"
        strokeOpacity="0.54"
        strokeWidth="2"
        markerEnd="url(#end-arrow)"
      />
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
    const { elements } = this.props.petriNet;

    const source = elements.find((e: IPetriNetElement) => { return e.id === arc.source; });
    const target = elements.find((e: IPetriNetElement) => { return e.id === arc.target; });

    if (source && target) {
      return <Arc key={index} source={source} target={target} />;
    }

    return null;
  }

  private renderArcDrawer(): JSX.Element | null {
    const { ui: { arcDrawer }, elements } = this.props.petriNet;

    if (arcDrawer) {
      const source = elements.find((e: IPetriNetElement) => { return e.id === arcDrawer.source; });

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
