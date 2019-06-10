import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ART } from 'react-native';

const CIRCLE = Math.PI * 2;

function makeSectorPath(x, y, angle, radius) {
  if (angle >= CIRCLE) {
    return ART.Path()
      .moveTo(x, y)
      .move(radius, 0)
      .arc(0, radius * 2, radius, radius)
      .arc(0, radius * -2, radius, radius)
      .close();
  }

  const startAngle = Math.PI / 2 - angle;
  const endAngle = Math.PI / 2;
  const arcFlag = angle > Math.PI ? 1 : 0;
  const centerX = x + radius;
  const centerY = y + radius;

  return `M${centerX} ${centerY}
          L${centerX + Math.cos(startAngle) * radius} ${centerY -
    Math.sin(startAngle) * radius}
          A${radius} ${radius} 0 ${arcFlag} 0 ${centerX +
    Math.cos(endAngle) * radius} ${centerY - Math.sin(endAngle) * radius}
          L${centerX} ${centerY}`;
}

export default class Sector extends Component {
  static propTypes = {
    angle: PropTypes.number.isRequired, // in radians
    radius: PropTypes.number.isRequired,
    offset: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number,
    }),
  };

  static defaultProps = {
    offset: { top: 0, left: 0 },
  };

  render() {
    const { angle, radius, offset, ...restProps } = this.props;
    const path = makeSectorPath(
      offset.left || 0,
      offset.top || 0,
      angle,
      radius
    );
    return <ART.Shape d={path} {...restProps} />;
  }
}
