'use strict';

var React = require('react-native');
var {
  Animated,
  View,
  PropTypes,
} = React

var ProgressBar = React.createClass({
  propTypes: {
    animated: PropTypes.bool,
    progress: PropTypes.number.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    borderRadius: PropTypes.number,
    borderWidth: PropTypes.number,
    color: PropTypes.string,
    borderColor: PropTypes.string,
    unfilledColor: PropTypes.string,
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
    };
  },

  getInitialState: function() {
    var progress = Math.min(Math.max(this.props.progress, 0), 1);
    var animationValue = new Animated.Value(progress);
    return {
      animationValue,
    };
  },

  componentWillReceiveProps: function(props) {
    if(props.progress === this.props.progress) {
      return;
    }

    var progress = Math.min(Math.max(props.progress, 0), 1);

    if(this.props.animated) {
      Animated.spring(this.state.animationValue, {
        toValue: progress,
      }).start();
    } else {
      this.state.animationValue.setValue(progress);
    }
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
    var progresStyle = {
      backgroundColor: color,
      height,
      width: this.state.animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width],
      }),
    };

    return (
      <View style={[containerStyle, style]} {...props}>
        <Animated.View style={progresStyle} />
        {children}
      </View>
    );
  }
});

module.exports = ProgressBar;
