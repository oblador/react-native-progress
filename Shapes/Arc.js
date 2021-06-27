import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Path } from 'react-native-svg';

const CIRCLE = Math.PI * 2;

function makeArcPath(x, y, startAngleArg, endAngleArg, radius, direction) {
  let startAngle = startAngleArg;
  let endAngle = endAngleArg;
  if (endAngle - startAngle >= CIRCLE) {
    endAngle = CIRCLE + (endAngle % CIRCLE);
  } else {
    endAngle = endAngle % CIRCLE;
  }
  startAngle = startAngle % CIRCLE;
  const angle =
    startAngle > endAngle
      ? CIRCLE - startAngle + endAngle
      : endAngle - startAngle;

  if (angle >= CIRCLE) {
    return `M${x + radius} ${y}
            a${radius} ${radius} 0 0 1 0 ${radius * 2}
            a${radius} ${radius} 0 0 1 0 ${radius * -2}`;
  }

  const directionFactor = direction === 'counter-clockwise' ? -1 : 1;
  endAngle *= directionFactor;
  startAngle *= directionFactor;
  const startSine = Math.sin(startAngle);
  const startCosine = Math.cos(startAngle);
  const endSine = Math.sin(endAngle);
  const endCosine = Math.cos(endAngle);

  const arcFlag = angle > Math.PI ? 1 : 0;
  const reverseFlag = direction === 'counter-clockwise' ? 0 : 1;

  return `M${x + radius * (1 + startSine)} ${y + radius - radius * startCosine}
          A${radius} ${radius} 0 ${arcFlag} ${reverseFlag} ${x +
    radius * (1 + endSine)} ${y + radius - radius * endCosine}`;
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
    strokeCap: PropTypes.string,
    strokeWidth: PropTypes.number,
    direction: PropTypes.oneOf(['clockwise', 'counter-clockwise']),
  };

  static defaultProps = {
    startAngle: 0,
    offset: { top: 0, left: 0 },
    strokeCap: 'butt',
    strokeWidth: 0,
    direction: 'clockwise',
  };

  render() {
    const {
      startAngle,
      endAngle,
      radius,
      offset,
      direction,
      strokeCap,
      strokeWidth,
      ...restProps
    } = this.props;

    const path = makeArcPath(
      (offset.left || 0) + strokeWidth / 2,
      (offset.top || 0) + strokeWidth / 2,
      startAngle,
      endAngle,
      radius - strokeWidth / 2,
      direction
    );

    return (
      <Path
        d={path}
        strokeLinecap={strokeCap}
        strokeWidth={strokeWidth}
        {...restProps}
      />
    );
  }
}
