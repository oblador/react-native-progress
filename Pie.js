var React = require('react-native');

var { View, PropTypes, Animated } = React;
var { Surface, Shape, Path } = require('../react-native/Libraries/ART/ReactNativeART');

var Circle = require('./Shapes/Circle');
var Sector = require('./Shapes/Sector');

var ProgressPie = React.createClass({
  propTypes: {
    size: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    borderWidth: PropTypes.number,
    color: PropTypes.string,
    borderColor: PropTypes.string,
    unfilledColor: PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      progress: 0,
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

    var angle = (indeterminate ? 0.2 : progress) * Math.PI * 2;
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
