import React, {
  Component,
  PropTypes,
} from 'react';

import {
  ART,
  Text,
  View,
} from 'react-native';

import Arc from './Shapes/Arc';

export default class ProgressCircle extends Component {
  static propTypes = {
    borderColor: PropTypes.string,
    borderWidth: PropTypes.number,
    color: PropTypes.string,
    direction: PropTypes.oneOf(['clockwise', 'counter-clockwise']),
    formatText: PropTypes.func,
    indeterminate: PropTypes.bool,
    progress: PropTypes.number,
    showsText: PropTypes.bool,
    size: PropTypes.number,
    textStyle: PropTypes.any,
    thickness: PropTypes.number,
    unfilledColor: PropTypes.string,
  };

  static defaultProps = {
    borderWidth: 1,
    color: 'rgba(0, 122, 255, 1)',
    direction: 'clockwise',
    formatText: progress => Math.round(progress * 100) + '%',
    progress: 0,
    showsText: false,
    size: 40,
    thickness: 3,
  };

  render() {
    let {
      borderColor,
      borderWidth,
      color,
      children,
      direction,
      formatText,
      indeterminate,
      progress,
      showsText,
      size,
      textStyle,
      thickness,
      unfilledColor,
      ...restProps,
    } = this.props;

    borderWidth = borderWidth || (indeterminate ? 1 : 0);

    const radius = size / 2 - borderWidth;
    const offset = {
      top: borderWidth,
      left: borderWidth,
    };
    const textOffset = borderWidth + thickness;
    const textSize = size - textOffset * 2;

    return (
      <View {...restProps}>
        <ART.Surface
          width={size}
          height={size}>
          {unfilledColor && progress !== 1 ? (<Arc
            radius={radius}
            offset={offset}
            startAngle={progress * 2 * Math.PI}
            endAngle={2 * Math.PI}
            direction={direction}
            stroke={unfilledColor}
            strokeWidth={thickness} />) : false}
          {!indeterminate && progress ? (<Arc
            radius={radius}
            offset={offset}
            startAngle={0}
            endAngle={progress * 2 * Math.PI}
            direction={direction}
            stroke={color}
            strokeWidth={thickness} />) : false}
          {borderWidth ?
            (<Arc
              radius={size / 2}
              startAngle={0}
              endAngle={(indeterminate ? 1.8 : 2) * Math.PI}
              stroke={borderColor || color}
              strokeWidth={borderWidth} />) : false}
        </ART.Surface>
        {!indeterminate && progress && showsText ? (
          <View style={{
            position: 'absolute',
            left: textOffset,
            top: textOffset,
            width: textSize,
            height: textSize,
            borderRadius: textSize / 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={[{
              color: color,
              fontSize: textSize / 4.5,
              fontWeight: '300',
            }, textStyle]}>{formatText(progress)}</Text>
          </View>
        ) : false}
        {children}
      </View>
    );
  }
}
