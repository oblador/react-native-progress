import React, { Component } from 'react';
import _PropTypes from 'prop-types';
import {
  Animated,
  ART,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
} from 'react-native';

import Arc from './Shapes/Arc';
import withAnimation from './withAnimation';

const CIRCLE = Math.PI * 2;

const AnimatedSurface = Animated.createAnimatedComponent(ART.Surface);
const AnimatedArc = Animated.createAnimatedComponent(Arc);

const RNViewPropTypes = ViewPropTypes || View.propTypes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
});

export class ProgressCircle extends Component {
  static propTypes = {
    animated: _PropTypes.bool,
    borderColor: _PropTypes.string,
    borderWidth: _PropTypes.number,
    color: _PropTypes.string,
    children: _PropTypes.node,
    direction: _PropTypes.oneOf(['clockwise', 'counter-clockwise']),
    formatText: _PropTypes.func,
    indeterminate: _PropTypes.bool,
    progress: _PropTypes.oneOfType([
      _PropTypes.number,
      _PropTypes.instanceOf(Animated.Value),
    ]),
    rotation: _PropTypes.instanceOf(Animated.Value),
    showsText: _PropTypes.bool,
    size: _PropTypes.number,
    style: RNViewPropTypes.style,
    textStyle: Text.propTypes.style,
    thickness: _PropTypes.number,
    unfilledColor: _PropTypes.string,
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
  };

  constructor(props, context) {
    super(props, context);

    this.progressValue = 0;
  }

  componentWillMount() {
    if (this.props.animated) {
      this.props.progress.addListener((event) => {
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
      ...restProps
    } = this.props;

    const border = borderWidth || (indeterminate ? 1 : 0);

    const radius = (size / 2) - border;
    const offset = {
      top: border,
      left: border,
    };
    const textOffset = border + thickness;
    const textSize = size - (textOffset * 2);

    const Surface = rotation ? AnimatedSurface : ART.Surface;
    const Shape = animated ? AnimatedArc : Arc;
    const progressValue = animated ? this.progressValue : progress;
    const angle = animated ? Animated.multiply(progress, CIRCLE) : progress * CIRCLE;

    return (
      <View style={[styles.container, style]} {...restProps}>
        <Surface
          width={size}
          height={size}
          style={{
            transform: [{
              rotate: indeterminate && rotation
                ? rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                })
                : '0deg',
            }],
          }}
        >
          {unfilledColor && progressValue !== 1 ? (
            <Shape
              radius={radius}
              offset={offset}
              startAngle={angle}
              endAngle={CIRCLE}
              direction={direction}
              stroke={unfilledColor}
              strokeWidth={thickness}
            />
          ) : false}
          {!indeterminate ? (
            <Shape
              radius={radius}
              offset={offset}
              startAngle={0}
              endAngle={angle}
              direction={direction}
              stroke={color}
              strokeCap={strokeCap}
              strokeWidth={thickness}
            />
          ) : false}
          {border ? (
            <Arc
              radius={size / 2}
              startAngle={0}
              endAngle={(indeterminate ? 1.8 : 2) * Math.PI}
              stroke={borderColor || color}
              strokeCap={strokeCap}
              strokeWidth={border}
            />
          ) : false}
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
              style={[{
                color,
                fontSize: textSize / 4.5,
                fontWeight: '300',
              }, textStyle]}
            >
              {formatText(progressValue)}
            </Text>
          </View>
        ) : false}
        {children}
      </View>
    );
  }
}

export default withAnimation(ProgressCircle);
