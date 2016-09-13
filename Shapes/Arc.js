/* eslint new-cap: ["error", { "capIsNew": false }] */

import React, {
  Component,
  PropTypes,
} from 'react';

import { ART } from 'react-native';

const CIRCLE = Math.PI * 2;

function makeArcPath(x, y, startAngleArg, endAngleArg, radius, direction) {
  let startAngle = startAngleArg;
  let endAngle = endAngleArg;
  const arcMethod = direction === 'counter-clockwise' ? 'counterArc' : 'arc';
  if (endAngle - startAngle >= CIRCLE) {
    endAngle = CIRCLE + (endAngle % CIRCLE);
  } else {
    endAngle = endAngle % CIRCLE;
  }
  startAngle = startAngle % CIRCLE;
  const angle = startAngle > endAngle ? CIRCLE - startAngle + endAngle : endAngle - startAngle;


  let path = ART.Path();

  if (angle >= CIRCLE) {
    path
      .moveTo(x + radius, y)
      [arcMethod](0, radius * 2, radius, radius)
      [arcMethod](0, radius * -2, radius, radius)
      .close();
  } else {
    const directionFactor = direction === 'counter-clockwise' ? -1 : 1;
    endAngle *= directionFactor;
    startAngle *= directionFactor;
    const startSine = Math.sin(startAngle);
    const startCosine = Math.cos(startAngle);
    const endSine = Math.sin(endAngle);
    const endCosine = Math.cos(endAngle);
    const deltaSine = endSine - startSine;
    const deltaCosine = endCosine - startCosine;

    const arcFlag = angle > Math.PI ? 1 : 0;
    const reverseFlag = direction === 'counter-clockwise' ? 0 : 1;

    return `M${x + radius * (1 + startSine)} ${y + radius - radius * startCosine}
              A${radius} ${radius} 0 ${arcFlag} ${reverseFlag} ${x + radius * (1 + endSine)} ${y + radius - radius * endCosine}`;
  }
  return path;
}

export default class Arc extends Component {
  static propTypes = {
    startAngle: PropTypes.number.isRequired, // in radians
    endAngle: PropTypes.number.isRequired, // in radians
    radius: PropTypes.number.isRequired,
    offset: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
    }),
    strokeWidth: PropTypes.number,
    direction: PropTypes.oneOf(['clockwise', 'counter-clockwise']),
  };

  static defaultProps = {
    startAngle: 0,
    offset: { top: 0, left: 0 },
    strokeWidth: 0,
    direction: 'clockwise',
  };

  render() {
    const { startAngle, endAngle, radius, offset, direction, strokeWidth, ...restProps } = this.props;
    const path = makeArcPath(
      (offset.left || 0) + strokeWidth / 2,
      (offset.top || 0) + strokeWidth / 2,
      startAngle,
      endAngle,
      radius - strokeWidth / 2,
      direction
    );
    return (
      <ART.Shape
        d={path}
        strokeCap="butt"
        strokeWidth={strokeWidth}
        {...restProps}
      />
    );
  }
}
