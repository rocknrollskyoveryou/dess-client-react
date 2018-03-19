import * as React from 'react';
import * as d3 from 'd3';

export default class Arcs extends React.Component<{}, {}> {
    private ref: SVGGElement;

    public componentDidMount(): void {
        
        const arcs = [{
            source: [100, 100],
            target: [200, 200],
        }];
          
        const linkRadial = d3.linkHorizontal()
            .x(function(d: any) { return d[1]; })
            .y(function(d: any) { return d[0]; });

        d3.select(this.ref)
            .selectAll('path')
            .data(arcs)
            .enter()
            .append('path')
            .attr('fill', 'none')
            .attr('stroke', '#757575')
            .attr('stroke-width', '2')
            .attr('marker-end', 'url(#end-arrow)')
            .attr('d', linkRadial);

    }
  
    public render(): JSX.Element {
        return (
            <g className="arcs" ref={(ref: SVGGElement) => this.ref = ref} />
        );
    }
}