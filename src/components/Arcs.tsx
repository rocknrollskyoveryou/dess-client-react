import * as React from 'react';
import * as d3 from 'd3';
import { IArc, IPlace, ITransition, IPetriNet } from '../types/petriNet';

interface ID3Arc {
    source: IPlace | ITransition;
    target: IPlace | ITransition;
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
  
    // private linkRadial = d3.linkHorizontal()
    //     .x(function(d: any) { return d[0]; })
    //     .y(function(d: any) { return d[1]; });

    public componentDidMount(): void {
        // this.updatePlace(this.props);
    }

    public componentWillReceiveProps(nextProps: ID3Arc): void {
        // this.updatePlace(nextProps);
    }

    // public shouldComponentUpdate(nextProps: ID3Arc): boolean {
    //     return false;
    // }
  
    public render(): JSX.Element {
        const { source, target } = this.props;
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
        const { source, target } = this.props;

        let curve: ICurve = {
            x0: 0,
            y0: source.y,
            x1: 0,
            y1: target.y,
            midX: 0,
        };

        const dx = target.x - source.x;
        
        if (dx >= 0) {
            curve.x0 = source.x + source.width / 2 + 5;
            curve.x1 = target.x - target.width / 2 - 9;
        } else {
            curve.x0 = source.x - source.width / 2 - 5;
            curve.x1 = target.x + target.width / 2 + 9;
        }

        curve.midX = (curve.x0 + curve.x1) / 2;

        return curve;
    }
    // private updatePlace(pos: ID3Arc): void {
    //     const { source, target } = this.props;

    //     let x0: number = source.x, x1: number = target.x;

    //     const dx = target.x - source.x;
    //     if (dx >= 0) {
    //         x0 += source.width / 2 + 5;
    //         x1 -= target.width / 2 + 9;
    //     } else {
    //         x0 -= source.width / 2 + 5;
    //         x1 += target.width / 2 + 9;
    //     }

    //     const arc = {
    //         source: [x0, source.y],
    //         target: [x1, target.y],
    //     };
    //     d3.select(this.ref)
    //         .datum(arc)
    //         .attr('d', this.linkRadial);
    // }
}

export default class Arcs extends React.Component<{ data: IPetriNet }, {}> {
    public render(): JSX.Element {
        const incomingArcs: Array<JSX.Element | null> = this.props.data.incomingArcs.map((arc: IArc, index: number) => {
            const place = this.props.data.places.find(
                (e: IPlace) => { return e.id === arc.placeId; }
            );
            const transition = this.props.data.transitions.find(
                (e: ITransition) => { return e.id === arc.transitionId; }
            );
            if (place && transition) {
                return <Arc key={index} source={place} target={transition}/>;
            } else {
                return null;
            }
        });

        const outgoingArcs: Array<JSX.Element | null> = this.props.data.outgoingArcs.map((arc: IArc, index: number) => {
            const place = this.props.data.places.find(
                (e: IPlace) => { return e.id === arc.placeId; }
            );
            const transition = this.props.data.transitions.find(
                (e: ITransition) => { return e.id === arc.transitionId; }
            );
            if (place && transition) {
                return <Arc key={index} source={transition} target={place}/>;
            } else {
                return null;
            }
        });

        return (
            <g className="arcs">
                {incomingArcs}
                {outgoingArcs}
            </g>
        );
    }
}