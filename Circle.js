'use strict';

var React = require('react-native');
var {
  View,
  PropTypes,
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
  },

  getDefaultProps: function() {
    return {
      progress: 0,
      size: 40,
      thickness: 3,
      borderWidth: 1,
      color: 'rgba(0, 122, 255, 1)',
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
            strokeWidth={thickness} />) : false}
          {borderWidth ?
            (<Circle
              radius={size/2}
              stroke={borderColor || color}
              strokeDash={[outerCircumference * (indeterminate ? 0.9 : 1), outerCircumference]}
              strokeWidth={borderWidth} />) : false}
        </Surface>
        {children}
      </View>
    )
  }
});

module.exports = ProgressCircle;
