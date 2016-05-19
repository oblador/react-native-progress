import React, {
  Component,
  PropTypes,
} from 'react';

import {
  ART,
  View,
} from 'react-native';

import Circle from './Shapes/Circle';
import Sector from './Shapes/Sector';

export default class ProgressPie extends Component {
  static propTypes = {
    borderColor: PropTypes.string,
    borderWidth: PropTypes.number,
    color: PropTypes.string,
    progress: PropTypes.number,
    size: PropTypes.number,
    unfilledColor: PropTypes.string,
  };

  static defaultProps = {
    borderWidth: 1,
    color: 'rgba(0, 122, 255, 1)',
    progress: 0,
    size: 40,
  };

  render() {
    const {
      progress,
      size,
      borderWidth,
      color,
      borderColor,
      unfilledColor,
      indeterminate,
      children,
      ...restProps,
    } = this.props;

    const angle = progress * Math.PI * 2;
    const radius = size / 2 - borderWidth;
    const offset = {
      top: borderWidth,
      left: borderWidth,
    };

    return (
      <View {...restProps}>
        <ART.Surface
          width={size}
          height={size}>
          {unfilledColor ? (<Circle
            radius={radius}
            offset={offset}
            fill={unfilledColor} />) : false}
          {angle ? (<Sector
            radius={radius}
            angle={angle}
            offset={offset}
            fill={color} />) : false}
          {borderWidth ?
            (<Circle
              radius={size / 2}
              stroke={borderColor || color}
              strokeWidth={borderWidth} />) : false}
        </ART.Surface>
        {children}
      </View>
    );
  }
}
