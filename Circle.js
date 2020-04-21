import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Surface as ARTSurface } from '@react-native-community/art';

import Arc from './Shapes/Arc';
import withAnimation from './withAnimation';

const CIRCLE = Math.PI * 2;

const AnimatedSurface = Animated.createAnimatedComponent(ARTSurface);
const AnimatedArc = Animated.createAnimatedComponent(Arc);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
});

export class ProgressCircle extends Component {
  static propTypes = {
    animated: PropTypes.bool,
    borderColor: PropTypes.string,
    borderWidth: PropTypes.number,
    color: PropTypes.string,
    children: PropTypes.node,
    direction: PropTypes.oneOf(['clockwise', 'counter-clockwise']),
    fill: PropTypes.string,
    formatText: PropTypes.func,
    indeterminate: PropTypes.bool,
    progress: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.instanceOf(Animated.Value),
    ]),
    rotation: PropTypes.instanceOf(Animated.Value),
    showsText: PropTypes.bool,
    size: PropTypes.number,
    style: PropTypes.any,
    strokeCap: PropTypes.oneOf(['butt', 'square', 'round']),
    textStyle: PropTypes.any,
    thickness: PropTypes.number,
    unfilledColor: PropTypes.string,
    endAngle: PropTypes.number,
    allowFontScaling: PropTypes.bool,
  };

  static defaultProps = {
    borderWidth: 1,
    color: 'rgba(0, 122, 255, 1)',
    direction: 'clockwise',
    formatText: progress => `${Math.round(progress * 100)}%`,
    progress: 0,
    showsText: false,
    size: 40,
    thickness: 3,
    endAngle: 0.9,
    allowFontScaling: true,
  };

  constructor(props, context) {
    super(props, context);

    this.progressValue = 0;
  }

  componentDidMount() {
    if (this.props.animated) {
      this.props.progress.addListener(event => {
        this.progressValue = event.value;
        if (this.props.showsText || this.progressValue === 1) {
          this.forceUpdate();
        }
      });
    }
  }

  render() {
    const {
      animated,
      borderColor,
      borderWidth,
      color,
      children,
      direction,
      fill,
      formatText,
      indeterminate,
      progress,
      rotation,
      showsText,
      size,
      style,
      strokeCap,
      textStyle,
      thickness,
      unfilledColor,
      endAngle,
      allowFontScaling,
      ...restProps
    } = this.props;

    const border = borderWidth || (indeterminate ? 1 : 0);

    const radius = size / 2 - border;
    const offset = {
      top: border,
      left: border,
    };
    const textOffset = border + thickness;
    const textSize = size - textOffset * 2;

    const Surface = rotation ? AnimatedSurface : ARTSurface;
    const Shape = animated ? AnimatedArc : Arc;
    const progressValue = animated ? this.progressValue : progress;
    const angle = animated
      ? Animated.multiply(progress, CIRCLE)
      : progress * CIRCLE;

    return (
      <View style={[styles.container, style]} {...restProps}>
        <Surface
          width={size}
          height={size}
          style={{
            transform: [
              {
                rotate:
                  indeterminate && rotation
                    ? rotation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      })
                    : '0deg',
              },
            ],
          }}
        >
          {unfilledColor && progressValue !== 1 ? (
            <Shape
              fill={fill}
              radius={radius}
              offset={offset}
              startAngle={angle}
              endAngle={CIRCLE}
              direction={direction}
              stroke={unfilledColor}
              strokeWidth={thickness}
            />
          ) : (
            false
          )}
          {!indeterminate ? (
            <Shape
              fill={fill}
              radius={radius}
              offset={offset}
              startAngle={0}
              endAngle={angle}
              direction={direction}
              stroke={color}
              strokeCap={strokeCap}
              strokeWidth={thickness}
            />
          ) : (
            false
          )}
          {border ? (
            <Arc
              radius={size / 2}
              startAngle={0}
              endAngle={(indeterminate ? endAngle * 2 : 2) * Math.PI}
              stroke={borderColor || color}
              strokeCap={strokeCap}
              strokeWidth={border}
            />
          ) : (
            false
          )}
        </Surface>
        {!indeterminate && showsText ? (
          <View
            style={{
              position: 'absolute',
              left: textOffset,
              top: textOffset,
              width: textSize,
              height: textSize,
              borderRadius: textSize / 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={[
                {
                  color,
                  fontSize: textSize / 4.5,
                  fontWeight: '300',
                },
                textStyle,
              ]}
              allowFontScaling={allowFontScaling}
            >
              {formatText(progressValue)}
            </Text>
          </View>
        ) : (
          false
        )}
        {children}
      </View>
    );
  }
}

export default withAnimation(ProgressCircle);
