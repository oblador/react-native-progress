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
var Sector = require('./Shapes/Sector');

var ProgressPie = React.createClass({
  propTypes: {
    size: PropTypes.number,
    progress: PropTypes.number,
    color: PropTypes.string,
    unfilledColor: PropTypes.string,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      progress: 0,
      size: 40,
      borderWidth: 1,
      color: 'rgba(0, 122, 255, 1)',
    };
  },

  render() {
    var {
      progress,
      size,
      borderWidth,
      color,
      borderColor,
      unfilledColor,
      indeterminate,
      children,
      ...props
    } = this.props;

    var angle = progress * Math.PI * 2;
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
            fill={unfilledColor} />) : false}
          {angle ? (<Sector
            radius={radius}
            angle={angle}
            offset={offset}
            fill={color} />) : false}
          {borderWidth ?
            (<Circle
              radius={size/2}
              stroke={borderColor || color}
              strokeWidth={borderWidth} />) : false}
        </Surface>
        {children}
      </View>
    )
  }
});

module.exports = ProgressPie;
