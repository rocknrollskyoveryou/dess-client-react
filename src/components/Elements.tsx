import * as React from 'react';

import { IPetriNetElement } from '../types/petriNet';

import Element from './Element';

export default class Elements extends React.Component<{ elements: IPetriNetElement[], selectedIdx: number }> {

  public render(): JSX.Element {
    const { elements, selectedIdx } = this.props;

    return (
      <g className="elements">
        {
          elements.map((el: IPetriNetElement, index: number) => {
            return <Element key={index} element={el} index={index} selected={selectedIdx === index} />;
          })
        }
      </g>
    );
  }
}