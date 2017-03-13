import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Animated,
  ART,
  StyleSheet,
  View,
} from 'react-native';

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
    outerBorderColor: PropTypes.string,
    outerBorderWidth: PropTypes.number,
    color: PropTypes.string,
    children: PropTypes.node,
    progress: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.instanceOf(Animated.Value),
    ]),
    rotation: PropTypes.instanceOf(Animated.Value),
    size: PropTypes.number,
    style: View.propTypes.style,
    unfilledColor: PropTypes.string,
  };

  static defaultProps = {
    outerBorderWidth: 1,
    color: 'rgba(0, 122, 255, 1)',
    progress: 0,
    size: 40,
  };

  render() {
    const {
      animated,
      outerBorderColor,
      outerBorderWidth,
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
    const radius = (size / 2) - outerBorderWidth;
    const offset = {
      top: outerBorderWidth,
      left: outerBorderWidth,
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
          {outerBorderWidth ? (
            <Circle
              radius={size / 2}
              stroke={outerBorderColor || color}
              strokeWidth={outerBorderWidth}
            />
          ) : false}
        </Surface>
        {children}
      </View>
    );
  }
}

export default withAnimation(ProgressPie, 0.2);
