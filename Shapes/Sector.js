'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ART: {
    Shape,
    Path
  }
} = ReactNative;

var makeSectorPath = function(x, y, angle, radius) {
  var circle = Math.PI * 2;
  var path = Path()
    .moveTo(x, y)
    .move(radius, 0);

  if(angle >= circle) {
    path
      .arc(0, radius*2, radius, radius)
      .arc(0, radius*-2, radius, radius);
  } else {
    var sine = Math.sin(angle);
    var cosine = Math.cos(angle);

    path
      .arc(radius * sine, -radius * (cosine-1), radius, radius, angle > Math.PI)
      .line(-radius * sine, radius * cosine);
  }
  path.close();
  return path;
};

var Sector = React.createClass({
  propTypes: {
    angle:  React.PropTypes.number.isRequired, // in radians
    radius: React.PropTypes.number.isRequired,
    offset: React.PropTypes.shape({
      top:  React.PropTypes.number,
      left: React.PropTypes.number,
    }),
  },

  getDefaultProps: function() {
    return {
      offset: { top: 0, left: 0 },
    };
  },

  render() {
    var { angle, radius, offset, ...props } = this.props;
    var path = makeSectorPath(
      (offset.left || 0),
      (offset.top || 0),
      angle,
      radius
    );
    return (
      <Shape d={path}
        {...props} />
    );
  }
});

module.exports = Sector;
