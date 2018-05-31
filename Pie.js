import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, ART, StyleSheet, View } from 'react-native';

import Circle from './Shapes/Circle';
import Sector from './Shapes/Sector';
import withAnimation from './withAnimation';

const CIRCLE = Math.PI * 2;

const AnimatedSurface = Animated.createAnimatedComponent(ART.Surface);
const AnimatedSector = Animated.createAnimatedComponent(Sector);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
});

export class ProgressPie extends Component {
  static propTypes = {
    animated: PropTypes.bool,
    borderColor: PropTypes.string,
    borderWidth: PropTypes.number,
    color: PropTypes.string,
    children: PropTypes.node,
    progress: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.instanceOf(Animated.Value),
    ]),
    rotation: PropTypes.instanceOf(Animated.Value),
    size: PropTypes.number,
    style: PropTypes.any,
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

    const angle = animated
      ? Animated.multiply(progress, CIRCLE)
      : progress * CIRCLE;
    const radius = size / 2 - borderWidth;
    const offset = {
      top: borderWidth,
      left: borderWidth,
    };

    return (
      <View style={[styles.container, style]} {...restProps}>
        <Surface
          width={size}
          height={size}
          style={
            rotation
              ? {
                  transform: [
                    {
                      rotate: rotation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                }
              : undefined
          }
        >
          {unfilledColor ? (
            <Circle radius={radius} offset={offset} fill={unfilledColor} />
          ) : (
            false
          )}
          <Shape radius={radius} angle={angle} offset={offset} fill={color} />
          {borderWidth ? (
            <Circle
              radius={size / 2}
              stroke={borderColor || color}
              strokeWidth={borderWidth}
            />
          ) : (
            false
          )}
        </Surface>
        {children}
      </View>
    );
  }
}

export default withAnimation(ProgressPie, 0.2);
