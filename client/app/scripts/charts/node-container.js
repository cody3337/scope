import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import d3 from 'd3';
import { Motion, spring } from 'react-motion';

import Node from './node';

class NodeContainer extends React.Component {
  render() {
    const { dx, dy, focused, layoutPrecision, zoomScale } = this.props;
    const animConfig = [80, 20]; // stiffness, damping
    const scaleFactor = focused ? (1 / zoomScale) : 1;
    const other = _.omit(this.props, 'dx', 'dy');

    console.log('nodecontainer.render');

    return (
      <Motion style={{
        x: spring(dx, animConfig),
        y: spring(dy, animConfig),
        f: spring(scaleFactor, animConfig)
      }}>
        {interpolated => {
          const transform = `translate(${d3.round(interpolated.x, layoutPrecision)},`
            + `${d3.round(interpolated.y, layoutPrecision)})`;
          return <Node {...other} transform={transform} scaleFactor={interpolated.f} />;
        }}
      </Motion>
    );
  }
}

export default connect()(NodeContainer);
