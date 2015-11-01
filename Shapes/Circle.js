'use strict';

var React = require('react-native');
var {
  PropTypes,
  ART: {
    Shape,
    Path
  }
} = React;


var makeCirclePath = function(x, y, radius) {
  return Path()
    .moveTo(x, y)
    .move(radius, 0)
    .arc(0, radius*2, radius, radius)
    .arc(0, radius*-2, radius, radius)
    .close();
};

var Circle = React.createClass({
  propTypes: {
    radius: PropTypes.number.isRequired,
    offset: PropTypes.shape({
      top:  PropTypes.number,
      left: PropTypes.number,
    }),
    strokeWidth: PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      offset: { top: 0, left: 0 },
      strokeWidth: 0,
    };
  },

  render() {
    var { radius, offset, strokeWidth, ...props } = this.props;
    var path = makeCirclePath(
      (offset.left || 0) + strokeWidth/2,
      (offset.top || 0) + strokeWidth/2,
      radius - strokeWidth/2
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
