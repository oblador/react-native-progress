'use strict';

var React = require('react-native');
var { PropTypes } = React;
var {
  Shape,
  Path,
} = require('../../react-native/Libraries/ART/ReactNativeART');


var makeCirclePath = function(x, y, radius) {
  return Path()
    .moveTo(x, y)
    .move(radius, 0)
    .arc(0, radius*2, radius, radius)
    .arc(0, radius*-2, radius, radius)
    .close();
};

var Ring = React.createClass({
  propTypes: {
    radius: PropTypes.number.isRequired,
    offset: PropTypes.shape({
      top:  PropTypes.number,
      left: PropTypes.number,
    }),
    thickness: PropTypes.number,
    color: PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      offset: { top: 0, left: 0 },
      thickness: 1,
      color: 'rgba(0, 122, 255, 1)',
    };
  },

  render() {
    var { radius, offset, color, thickness, ...props } = this.props;
    var path = makeCirclePath(
      (offset.left || 0) + thickness/2,
      (offset.top || 0) + thickness/2,
      radius - thickness/2
    );
    return (
      <Shape d={path}
        stroke={color}
        strokeCap="butt"
        strokeWidth={thickness}
        {...props} />
    );
  }
});

module.exports = Ring;
