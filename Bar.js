'use strict';

var React = require('react-native');
var {
  Animated,
  Easing,
  View,
  PropTypes,
} = React

var INDETERMINATE_WIDTH_FACTOR = 0.3;
var BAR_WIDTH_ZERO_POSITION = INDETERMINATE_WIDTH_FACTOR / (1+INDETERMINATE_WIDTH_FACTOR);

var ProgressBar = React.createClass({
  propTypes: {
    animated: PropTypes.bool,
    indeterminate: PropTypes.bool,
    progress: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.string,
    unfilledColor: PropTypes.string,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
    borderRadius: PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      animated: true,
      progress: 0,
      width: 150,
      height: 6,
      borderWidth: 1,
      borderRadius: 4,
      color: 'rgba(0, 122, 255, 1)',
      indeterminate: false,
    };
  },

  getInitialState: function() {
    var progress = Math.min(Math.max(this.props.progress, 0), 1);
    return {
      progress: new Animated.Value(this.props.indeterminate ? INDETERMINATE_WIDTH_FACTOR : progress),
      animationValue: new Animated.Value(BAR_WIDTH_ZERO_POSITION),
    };
  },

  componentDidMount: function() {
    if(this.props.indeterminate) {
      this.animate();
    }
  },

  componentWillReceiveProps: function(props) {
    if(props.indeterminate !== this.props.indeterminate) {
      if(props.indeterminate) {
        this.animate();
      } else {
        Animated.spring(this.state.animationValue, {
          toValue: BAR_WIDTH_ZERO_POSITION,
        }).start();
      }
    }
    if(props.indeterminate !== this.props.indeterminate || props.progress !== this.props.progress) {
      var progress = (props.indeterminate ? INDETERMINATE_WIDTH_FACTOR : Math.min(Math.max(props.progress, 0), 1));

      if(props.animated) {
        Animated.spring(this.state.progress, {
          toValue: progress,
          bounciness: 0,
        }).start();
      } else {
        this.state.progress.setValue(progress);
      }
    }
  },

  animate: function() {
    this.state.animationValue.setValue(0);
    Animated.timing(this.state.animationValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      isInteraction: false,
    }).start(endState => {
      if(endState.finished) {
        this.animate();
      }
    });
  },

  render: function() {
    var {
      width,
      height,
      style,
      borderRadius,
      borderWidth,
      color,
      borderColor,
      unfilledColor,
      indeterminate,
      children,
      ...props
    } = this.props;

    var containerStyle = {
      width,
      borderWidth,
      borderColor: borderColor || color,
      borderRadius,
      overflow: 'hidden',
      backgroundColor: unfilledColor,
    };
    var progressStyle = {
      backgroundColor: color,
      height,
      width: this.state.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width],
      }),
      transform: [{
        translateX: this.state.animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [width * -INDETERMINATE_WIDTH_FACTOR, width]
        })
      }]
    };

    return (
      <View style={[containerStyle, style]} {...props}>
        <Animated.View style={progressStyle} />
        {children}
      </View>
    );
  }
});

module.exports = ProgressBar;
