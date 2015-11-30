'use strict';

var React = require('react-native');
var {
  View,
  PropTypes,
  Text,
  ART: {
    Surface
  }
} = React;

var Circle = require('./Shapes/Circle');

var ProgressCircle = React.createClass({
  propTypes: {
    size: PropTypes.number,
    progress: PropTypes.number,
    thickness: PropTypes.number,
    color: PropTypes.string,
    unfilledColor: PropTypes.string,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
    showsText: PropTypes.bool,
    formatText: PropTypes.func,
    textStyle: PropTypes.any,
    direction: PropTypes.oneOf(['clockwise', 'counter-clockwise']),
  },

  getDefaultProps: function() {
    return {
      progress: 0,
      size: 40,
      thickness: 3,
      borderWidth: 1,
      color: 'rgba(0, 122, 255, 1)',
      showsText: false,
      formatText: progress => Math.round(progress * 100) + '%',
      direction: 'clockwise',
    };
  },

  render() {
    var {
      progress,
      size,
      thickness,
      borderWidth,
      color,
      borderColor,
      unfilledColor,
      indeterminate,
      children,
      showsText,
      formatText,
      textStyle,
      direction,
      ...props
    } = this.props;

    borderWidth = borderWidth || (indeterminate ? 1 : 0);

    var innerCircumference = (size - borderWidth - thickness) * Math.PI;
    var outerCircumference = (size - borderWidth) * Math.PI;
    var radius = size/2 - borderWidth;
    var offset = {
      top: borderWidth,
      left: borderWidth,
    };
    var textOffset = borderWidth + thickness;
    var textSize = size - textOffset * 2;

    return (
      <View {...props}>
        <Surface
          width={size}
          height={size}>
          {unfilledColor ? (<Circle
            radius={radius}
            offset={offset}
            stroke={unfilledColor}
            strokeWidth={thickness} />) : false}
          {!indeterminate && progress ? (<Circle
            radius={radius}
            offset={offset}
            stroke={color}
            strokeDash={[innerCircumference * progress, innerCircumference]}
            direction={direction}
            strokeWidth={thickness} />) : false}
          {borderWidth ?
            (<Circle
              radius={size/2}
              stroke={borderColor || color}
              strokeDash={[outerCircumference * (indeterminate ? 0.9 : 1), outerCircumference]}
              direction={direction}
              strokeWidth={borderWidth} />) : false}
        </Surface>
        {!indeterminate && progress && showsText ? (
          <View style={{
            position: 'absolute',
            left: textOffset,
            top: textOffset,
            width: textSize,
            height: textSize,
            borderRadius: textSize/2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={[{
              color: color,
              fontSize: textSize/4.5,
              fontWeight: '300',
            }, textStyle]}>{formatText(progress)}</Text>
          </View>
        ) : false}
        {children}
      </View>
    )
  }
});

module.exports = ProgressCircle;
