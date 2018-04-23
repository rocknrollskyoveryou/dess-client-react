import * as React from 'react';
import * as d3 from 'd3';
import { IArc, IPlace, ITransition, IPetriNet } from '../types/petriNet';

interface IMouseCoords {
    mouseX: number;
    mouseY: number;
}

interface ID3Arc {
    source: IPlace | ITransition;
    target?: IPlace | ITransition;
    targetCoords?: IMouseCoords;
}

interface ICurve {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    midX: number;
}

class Arc extends React.Component<ID3Arc, {}> {
    private ref: SVGPathElement;
  
    public render(): JSX.Element {
        const { x0, y0, x1, y1, midX } = this.calcPath();
        
        return(
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
            y0: source.y,
            x1: 0,
            y1: 0,
            midX: 0,
        };

        if (target) {
            curve.y1 = target.y;

            const dx = target.x - source.x;
        
            if (dx >= 0) {
                curve.x0 = source.x + source.width / 2 + 5;
                curve.x1 = target.x - target.width / 2 - 9;
            } else {
                curve.x0 = source.x - source.width / 2 - 5;
                curve.x1 = target.x + target.width / 2 + 9;
            }
        } else if (targetCoords) {
            curve.y1 = targetCoords.mouseY;

            const dx = targetCoords.mouseX - source.x;

            if (dx >= 0) {
                curve.x0 = source.x + source.width / 2 + 5;
                curve.x1 = targetCoords.mouseX - 9;
            } else {
                curve.x0 = source.x - source.width / 2 - 5;
                curve.x1 = targetCoords.mouseX + 9;
            }
        }
        
        curve.midX = (curve.x0 + curve.x1) / 2;

        return curve;
    }
}

export default class Arcs extends React.Component<{ data: IPetriNet }, {}> {
    public render(): JSX.Element {
        const { arcs } = this.props.data;

        return (
            <g className="arcs">
                {arcs.map(this.renderArc)}
                {this.renderArcDrawer()}
            </g>
        );
    }

    private renderArc = (arc: IArc, index: number): JSX.Element | null => {
        const { places, transitions } = this.props.data;

        let source: IPlace | ITransition | undefined;
        let target: IPlace | ITransition | undefined;

        const sourcePredicate = (e: IPlace | ITransition) => { return e.id === arc.source; };
        const targetPredicate = (e: IPlace | ITransition) => { return e.id === arc.target; };

        if (arc.isIncoming) {
            source = places.find(sourcePredicate);
            target = transitions.find(targetPredicate);
        } else {
            source = transitions.find(sourcePredicate);
            target = places.find(targetPredicate);
        }
        
        if (source && target) {
            return <Arc key={index} source={source} target={target} />;
        } else {
            return null;
        }
    }

    private renderArcDrawer() {
        const { arcDrawer, places, transitions } = this.props.data;

        if (arcDrawer) {
            let source: IPlace | ITransition | undefined;

            const predicate = (e: IPlace | ITransition) => { return e.id === arcDrawer.source; };

            if (arcDrawer.isIncoming) {
                source = places.find(predicate);
            } else {
                source = transitions.find(predicate);
            }

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
