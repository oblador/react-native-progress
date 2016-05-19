/* eslint new-cap: ["error", { "capIsNew": false }] */

import React, {
  Component,
  PropTypes,
} from 'react';

import { ART } from 'react-native';

const CIRCLE = Math.PI * 2;

function makeSectorPath(x, y, angle, radius) {
  let path = ART.Path()
    .moveTo(x, y)
    .move(radius, 0);

  if (angle >= CIRCLE) {
    path
      .arc(0, radius * 2, radius, radius)
      .arc(0, radius * -2, radius, radius);
  } else {
    const sine = Math.sin(angle);
    const cosine = Math.cos(angle);

    path
      .arc(radius * sine, -radius * (cosine - 1), radius, radius, angle > Math.PI)
      .line(-radius * sine, radius * cosine);
  }
  path.close();
  return path;
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
      (offset.left || 0),
      (offset.top || 0),
      angle,
      radius
    );
    return (
      <ART.Shape d={path} {...restProps} />
    );
  }
}
