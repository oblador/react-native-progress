'use strict';

var React = require('react-native');
var {
  PropTypes,
  ART: {
    Shape,
    Path
  }
} = React;

var makeArcPath = function(x, y, startAngle, endAngle, radius) {
  var circle = Math.PI * 2;
  startAngle = startAngle % circle;
  endAngle = endAngle % circle;
  var angle = startAngle > endAngle ? circle - startAngle + endAngle : endAngle - startAngle;

  var path = Path();

  if(angle >= circle) {
    path
      .moveTo(x + radius, y)
      .arc(0, radius*2, radius, radius)
      .arc(0, radius*-2, radius, radius);
  } else {
    var startSine = Math.sin(startAngle);
    var startCosine = Math.cos(startAngle);
    var endSine = Math.sin(endAngle);
    var endCosine = Math.cos(endAngle);
    var deltaSine = endSine - startSine;
    var deltaCosine = endCosine - startCosine;

    path
      .moveTo(x + radius * (1 + startSine), y + radius - radius * startCosine)
      .arc(radius * deltaSine, radius * -deltaCosine, radius, radius, angle > Math.PI);
  }
  return path;
};

var Arc = React.createClass({
  propTypes: {
    startAngle: PropTypes.number.isRequired, // in radians
    endAngle: PropTypes.number.isRequired, // in radians
    radius: PropTypes.number.isRequired,
    offset: PropTypes.shape({
      top:  PropTypes.number,
      left: PropTypes.number,
    }),
  },

  getDefaultProps: function() {
    return {
      startAngle: 0,
      offset: { top: 0, left: 0 },
    };
  },

  render() {
    var { startAngle, endAngle, radius, offset, ...props } = this.props;
    var path = makeArcPath(
      (offset.left || 0),
      (offset.top || 0),
      startAngle,
      endAngle,
      radius
    );
    return (
      <Shape d={path}
        {...props} />
    );
  }
});

module.exports = Arc;
