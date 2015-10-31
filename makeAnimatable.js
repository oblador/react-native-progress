'use strict';

var React = require('react-native');
var {
  PropTypes,
  Animated,
  Easing,
} = React;

var makeAnimatable = function(Component) {
  var AnimatedComponent = Animated.createAnimatedComponent(Component);
  return React.createClass({
    propTypes: {
      animated: PropTypes.bool,
      indeterminate: PropTypes.bool,
      progress: PropTypes.number.isRequired,
    },

    getDefaultProps: function() {
      return {
        animated: true,
        indeterminate: false,
        progress: 0,
      };
    },

    getInitialState: function() {
      var progress = Math.min(Math.max(this.props.progress, 0), 1);
      var animationValue = new Animated.Value(progress);
      return {
        progress,
        animationValue,
        rotation: new Animated.Value(0),
      };
    },

    componentWillReceiveProps: function(props) {
      if(props.indeterminate !== this.props.indeterminate) {
        if(props.indeterminate) {
          this.spin();
        } else {
          Animated.spring(this.state.rotation, {
            toValue: 0,
          }).start();
        }
      }
      if(!props.indeterminate && props.progress !== this.props.progress) {
        var progress = Math.min(Math.max(props.progress, 0), 1);
        if(props.animated) {
          Animated.spring(this.state.animationValue, {
            toValue: progress,
          }).start();
        } else {
          this.setState({ progress });
        }
      }
    },

    spin: function() {
      this.state.rotation.setValue(0);
      Animated.timing(this.state.rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        isInteraction: false,
      }).start(endState => {
        if(endState.finished) {
          this.spin();
        }
      });
    },

    componentDidMount: function() {
      this.state.animationValue.addListener(event => this.setState({ progress: event.value }));
      if(this.props.indeterminate) {
        this.spin();
      }
    },

    componentWillUnmount: function() {
      this.state.animationValue.removeAllListeners();
    },

    render: function() {
      var { progress, size, style, children, ...props } = this.props;
      return (<AnimatedComponent
        progress={this.state.progress}
        size={size}
        style={[{
          backgroundColor: 'transparent',
          overflow: 'hidden',
          transform: [{
            rotate: this.state.rotation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            })
          }]
        }, style]}
        {...props}>{children}</AnimatedComponent>);
    }
  });
};

module.exports = makeAnimatable;
