'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ART: {
    Shape,
    Path
  }
} = ReactNative;

var makeCirclePath = function(x, y, radius, direction) {
  var arcMethod = direction === 'counter-clockwise' ? 'counterArc' : 'arc';

  return Path()
    .moveTo(x, y)
    .move(radius, 0)
    [arcMethod](0, radius*2, radius, radius)
    [arcMethod](0, radius*-2, radius, radius)
    .close();
};

var Circle = React.createClass({
  propTypes: {
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
      offset: { top: 0, left: 0 },
      strokeWidth: 0,
      direction: 'clockwise',
    };
  },

  render() {
    var { radius, offset, strokeWidth, direction, ...props } = this.props;
    var path = makeCirclePath(
      (offset.left || 0) + strokeWidth/2,
      (offset.top || 0) + strokeWidth/2,
      radius - strokeWidth/2,
      direction,
    );
    return (
      <Shape d={path}
        strokeCap="butt"
        strokeWidth={strokeWidth}
        {...props} />
    );
  }
});

module.exports = Circle;
