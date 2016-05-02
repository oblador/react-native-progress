'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  View,
  Animated,
  Easing,
  ART: {
    Surface
  }
} = ReactNative;

var Arc = Animated.createAnimatedComponent(require('./Shapes/Arc'))

var MIN_ARC_ANGLE = 0.1;
var MAX_ARC_ANGLE = 1.5 * Math.PI;

var CircleSnail = React.createClass({
  propTypes: {
    animating: React.PropTypes.bool,
    hidesWhenStopped: React.PropTypes.bool,
    size: React.PropTypes.number,
    thickness: React.PropTypes.number,
    color: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.arrayOf(React.PropTypes.string),
    ])
  },

  getDefaultProps: function() {
    return {
      animating: true,
      hidesWhenStopped: false,
      size: 40,
      thickness: 3,
      color: 'rgba(0, 122, 255, 1)',
    };
  },

  getInitialState: function() {
    return {
      startAngle: new Animated.Value(-MIN_ARC_ANGLE),
      endAngle: new Animated.Value(0),
      rotation: new Animated.Value(0),
      colorIndex: 0,
    };
  },

  componentWillMount: function() {
    if(this.props.animating) {
      this.animate();
      this.spin();
    }
  },

  componentWillReceiveProps: function(props) {
    if(props.animating !== this.props.animating) {
      if(props.animating) {
        this.animate();
        this.spin();
      } else {
        this.stopAnimations();
      }
    }
  },

  animate: function(iteration) {
    iteration = iteration || 1;
    Animated.sequence([
      Animated.timing(this.state.startAngle, {
        toValue: -MAX_ARC_ANGLE * iteration - MIN_ARC_ANGLE,
        duration: 1000,
        isInteraction: false,
        easing: Easing.inOut(Easing.quad),
      }),
      Animated.timing(this.state.endAngle, {
        toValue: -MAX_ARC_ANGLE * iteration,
        duration: 1000,
        isInteraction: false,
        easing: Easing.inOut(Easing.quad),
      })
    ]).start(endState => {
      if(endState.finished) {
        if(Array.isArray(this.props.color)) {
          this.setState({
            colorIndex: iteration % this.props.color.length,
          });
        }
        this.animate(iteration + 1);
      }
    });
  },

  spin: function() {
    Animated.timing(this.state.rotation, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      isInteraction: false,
    }).start(endState => {
      if(endState.finished) {
        this.state.rotation.setValue(0);
        this.spin();
      }
    });
  },

  stopAnimations: function() {
    this.state.startAngle.stopAnimation();
    this.state.endAngle.stopAnimation();
    this.state.rotation.stopAnimation();
  },

  render() {
    var {
      animating,
      hidesWhenStopped,
      size,
      thickness,
      color,
      style,
      children,
      ...props
    } = this.props;

    if(!animating && hidesWhenStopped) {
      return null;
    }

    var radius = size/2 - thickness;
    var offset = {
      top: thickness,
      left: thickness,
    };

    if(Array.isArray(color)) {
      color = color[this.state.colorIndex];
    }

    return (
      <Animated.View {...props} style={[
        style,
        {
          backgroundColor: 'transparent',
          overflow: 'hidden',
          transform: [{
            rotate: this.state.rotation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '-360deg'],
            })
          }]
        }
      ]}>
        <Surface
          width={size}
          height={size}>
          <Arc
            radius={radius}
            stroke={color}
            offset={offset}
            startAngle={this.state.startAngle}
            endAngle={this.state.endAngle}
            strokeCap="round"
            strokeWidth={thickness} />
        </Surface>
        {children}
      </Animated.View>
    )
  }
});

module.exports = CircleSnail;
