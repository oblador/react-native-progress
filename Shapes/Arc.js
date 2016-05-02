'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ART: {
    Shape,
    Path
  }
} = ReactNative;

var makeArcPath = function(x, y, startAngle, endAngle, radius, direction) {
  var arcMethod = direction === 'counter-clockwise' ? 'counterArc' : 'arc';
  var circle = Math.PI * 2;
  if(endAngle - startAngle >= circle) {
    endAngle = circle + (endAngle % circle);
  } else {
    endAngle = endAngle % circle;
  }
  startAngle = startAngle % circle;
  var angle = startAngle > endAngle ? circle - startAngle + endAngle : endAngle - startAngle;


  var path = Path();

  if(angle >= circle) {
    path
      .moveTo(x + radius, y)
      [arcMethod](0, radius*2, radius, radius)
      [arcMethod](0, radius*-2, radius, radius)
      .close();
  } else {
    var directionFactor = direction === 'counter-clockwise' ? -1 : 1;
    endAngle *= directionFactor;
    startAngle *= directionFactor;
    var startSine = Math.sin(startAngle);
    var startCosine = Math.cos(startAngle);
    var endSine = Math.sin(endAngle);
    var endCosine = Math.cos(endAngle);
    var deltaSine = endSine - startSine;
    var deltaCosine = endCosine - startCosine;

    path
      .moveTo(x + radius * (1 + startSine), y + radius - radius * startCosine)
      [arcMethod](radius * deltaSine, radius * -deltaCosine, radius, radius, angle > Math.PI);
  }
  return path;
};

var Arc = React.createClass({
  propTypes: {
    startAngle: React.PropTypes.number.isRequired, // in radians
    endAngle: React.PropTypes.number.isRequired, // in radians
    radius: React.PropTypes.number.isRequired,
    offset: React.PropTypes.shape({
      top:  React.PropTypes.number,
      left: React.PropTypes.number,
    }),
    strokeWidth: React.PropTypes.number,
    direction: React.PropTypes.oneOf(['clockwise', 'counter-clockwise']),
  },

  getDefaultProps: function() {
    return {
      startAngle: 0,
      offset: { top: 0, left: 0 },
      strokeWidth: 0,
      direction: 'clockwise',
    };
  },

  render() {
    var { startAngle, endAngle, radius, offset, direction, strokeWidth, ...props } = this.props;
    var path = makeArcPath(
      (offset.left || 0) + strokeWidth/2,
      (offset.top || 0) + strokeWidth/2,
      startAngle,
      endAngle,
      radius - strokeWidth/2,
      direction
    );
    return (
      <Shape d={path}
        strokeCap="butt"
        strokeWidth={strokeWidth}
        {...props} />
    );
  }
});

module.exports = Arc;
