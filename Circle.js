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

var Arc = require('./Shapes/Arc');

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
              radius={size/2}
              startAngle={0}
              endAngle={(indeterminate ? 1.8 : 2) * Math.PI}
              direction={direction}
              stroke={borderColor || color}
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
