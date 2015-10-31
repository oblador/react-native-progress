var React = require('react-native');

var { View, PropTypes, Animated } = React;
var { Surface, Shape, Path } = require('../react-native/Libraries/ART/ReactNativeART');

var Circle = require('./Shapes/Circle');

var ProgressCircle = React.createClass({
  propTypes: {
    animated: PropTypes.bool,
    size: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    thickness: PropTypes.number,
    borderWidth: PropTypes.number,
    color: PropTypes.string,
    borderColor: PropTypes.string,
    unfilledColor: PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      animated: true,
      progress: 0,
      thickness: 3,
      borderWidth: 1,
      color: 'rgba(0, 122, 255, 1)',
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

  render() {
    var { progress } = this.state;
    var {
      size,
      thickness,
      borderWidth,
      color,
      borderColor,
      unfilledColor,
      children,
      ...props
    } = this.props;

    var circumference = (size - borderWidth - thickness) * Math.PI;
    var radius = size/2 - borderWidth;
    var offset = {
      top: borderWidth,
      left: borderWidth,
    };

    return (
      <View {...props}>
        <Surface
          width={size}
          height={size}>
          {unfilledColor ? (<Circle
            radius={radius}
            offset={offset}
            stroke={unfilledColor}
            strokeWidth={thickness} />) : false}
          {progress ? (<Circle
            radius={radius}
            offset={offset}
            stroke={color}
            strokeDash={[circumference * progress, 700]}
            strokeWidth={thickness} />) : false}
          {borderWidth ?
            (<Circle
              radius={size/2}
              stroke={borderColor || color}
              strokeWidth={borderWidth} />) : false}
        </Surface>
        {children}
      </View>
    )
  }
});

module.exports = ProgressCircle;
