import React, { Component } from 'react';
import _PropTypes from 'prop-types';
import {
  Animated,
  ART,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';

import Circle from './Shapes/Circle';
import Sector from './Shapes/Sector';
import withAnimation from './withAnimation';

const CIRCLE = Math.PI * 2;

const AnimatedSurface = Animated.createAnimatedComponent(ART.Surface);
const AnimatedSector = Animated.createAnimatedComponent(Sector);

const RNViewPropTypes = ViewPropTypes || View.propTypes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
});

export class ProgressPie extends Component {
  static propTypes = {
    animated: _PropTypes.bool,
    borderColor: _PropTypes.string,
    borderWidth: _PropTypes.number,
    color: _PropTypes.string,
    children: _PropTypes.node,
    progress: _PropTypes.oneOfType([
      _PropTypes.number,
      _PropTypes.instanceOf(Animated.Value),
    ]),
    rotation: _PropTypes.instanceOf(Animated.Value),
    size: _PropTypes.number,
    style: RNViewPropTypes.style,
    unfilledColor: _PropTypes.string,
  };

  static defaultProps = {
    borderWidth: 1,
    color: 'rgba(0, 122, 255, 1)',
    progress: 0,
    size: 40,
  };

  render() {
    const {
      animated,
      borderColor,
      borderWidth,
      children,
      color,
      progress,
      rotation,
      size,
      style,
      unfilledColor,
      ...restProps
    } = this.props;


    const Surface = rotation ? AnimatedSurface : ART.Surface;
    const Shape = animated ? AnimatedSector : Sector;

    const angle = animated ? Animated.multiply(progress, CIRCLE) : progress * CIRCLE;
    const radius = (size / 2) - borderWidth;
    const offset = {
      top: borderWidth,
      left: borderWidth,
    };

    return (
      <View style={[styles.container, style]} {...restProps}>
        <Surface
          width={size}
          height={size}
          style={rotation ? {
            transform: [{
              rotate: rotation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            }],
          } : undefined}
        >
          {unfilledColor ? (
            <Circle
              radius={radius}
              offset={offset}
              fill={unfilledColor}
            />
          ) : false}
          <Shape
            radius={radius}
            angle={angle}
            offset={offset}
            fill={color}
          />
          {borderWidth ? (
            <Circle
              radius={size / 2}
              stroke={borderColor || color}
              strokeWidth={borderWidth}
            />
          ) : false}
        </Surface>
        {children}
      </View>
    );
  }
}

export default withAnimation(ProgressPie, 0.2);
