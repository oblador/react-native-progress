'use strict';

var React = require('react-native');
var { PropTypes, Animated } = React;

var makeAnimatable = function(Component) {
  return React.createClass({
    propTypes: {
      animated: PropTypes.bool,
      progress: PropTypes.number.isRequired,
    },

    getDefaultProps: function() {
      return {
        animated: true,
        progress: 0,
      };
    },

    getInitialState: function() {
      var progress = Math.min(Math.max(this.props.progress, 0), 1);
      var animationValue = new Animated.Value(progress);
      return {
        progress,
        animationValue,
      };
    },

    componentWillReceiveProps: function(props) {
      var progress = Math.min(Math.max(props.progress, 0), 1);
      if(progress === this.state.progress) {
        return;
      }

      if(this.props.animated) {
        Animated.spring(this.state.animationValue, {
          toValue: progress,
        }).start();
      } else {
        this.setState({ progress });
      }
    },

    componentDidMount: function() {
      this.state.animationValue.addListener(event => this.setState({ progress: event.value }));
    },

    componentWillUnmount: function() {
      this.state.animationValue.removeAllListeners();
    },

    render: function() {
      var { progress, children, ...props } = this.props;
      return (<Component progress={this.state.progress} {...props}>{children}</Component>);
    }
  });
};

module.exports = makeAnimatable;
