import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Easing,
  View,
} from 'react-native';

const INDETERMINATE_WIDTH_FACTOR = 0.3;
const BAR_WIDTH_ZERO_POSITION = INDETERMINATE_WIDTH_FACTOR / (1 + INDETERMINATE_WIDTH_FACTOR);

export default class ProgressBar extends Component {
  static propTypes = {
    animated: PropTypes.bool,
    borderColor: PropTypes.string,
    borderRadius: PropTypes.number,
    borderWidth: PropTypes.number,
    children: PropTypes.node,
    color: PropTypes.string,
    height: PropTypes.number,
    indeterminate: PropTypes.bool,
    progress: PropTypes.number,
    style: View.propTypes.style,
    unfilledColor: PropTypes.string,
    width: PropTypes.number,
  };

  static defaultProps = {
    animated: true,
    borderRadius: 4,
    borderWidth: 1,
    color: 'rgba(0, 122, 255, 1)',
    height: 6,
    indeterminate: false,
    progress: 0,
    width: 150,
  };

  // Get measured size in order to work nicely with flex sizing
  measureView (event) {
    this.setState({
      measuredLayout: {
        width: event.nativeEvent.layout.width,
        height: event.nativeEvent.layout.height,
      }
    });
  };

  constructor(props) {
    super(props);
    const progress = Math.min(Math.max(props.progress, 0), 1);
    this.state = {
      progress: new Animated.Value(props.indeterminate ? INDETERMINATE_WIDTH_FACTOR : progress),
      animationValue: new Animated.Value(BAR_WIDTH_ZERO_POSITION),
      measuredLayout: {
        width: props.width,
        height: props.height,
      },
    };
  }

  componentDidMount() {
    if (this.props.indeterminate) {
      this.animate();
    }
  }

  componentWillReceiveProps(props) {
    if (props.indeterminate !== this.props.indeterminate) {
      if (props.indeterminate) {
        this.animate();
      } else {
        Animated.spring(this.state.animationValue, {
          toValue: BAR_WIDTH_ZERO_POSITION,
        }).start();
      }
    }
    if (
      props.indeterminate !== this.props.indeterminate ||
      props.progress !== this.props.progress
    ) {
      const progress = (props.indeterminate
        ? INDETERMINATE_WIDTH_FACTOR
        : Math.min(Math.max(props.progress, 0), 1)
      );

      if (props.animated) {
        Animated.spring(this.state.progress, {
          toValue: progress,
          bounciness: 0,
        }).start();
      } else {
        this.state.progress.setValue(progress);
      }
    }
  }

  animate() {
    this.state.animationValue.setValue(0);
    Animated.timing(this.state.animationValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      isInteraction: false,
    }).start((endState) => {
      if (endState.finished) {
        this.animate();
      }
    });
  }

  render() {
    const {
      borderColor,
      borderRadius,
      borderWidth,
      children,
      color,
      height,
      style,
      unfilledColor,
      width,
      ...restProps
    } = this.props;

    const viewWidth = this.state.measuredLayout.width;
    const viewHeight = this.state.measuredLayout.height;
    const innerWidth = viewWidth - (borderWidth * 2);
    const innerHeight = viewHeight - (borderWidth * 2);
    const containerStyle = {
      height: React.Children.count(children) > 0 ? null : viewHeight, // Uses specified height or wraps the children content
      borderWidth,
      borderColor: borderColor || color,
      borderRadius,
      overflow: 'hidden',
      backgroundColor: unfilledColor,
    };
    const progressStyle = {
      position:'absolute',  // Overlay children on top of progress
      backgroundColor: color,
      height: innerHeight,
      width: innerWidth,
      transform: [{
        translateX: this.state.animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [innerWidth * -INDETERMINATE_WIDTH_FACTOR, innerWidth],
        }),
      }, {
        translateX: this.state.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [innerWidth / -2, 0],
        }),
      }, {
        scaleX: this.state.progress,
      }],
    };

    return (
      <View style={[containerStyle, style]}
        onLayout={(event) => this.measureView(event)}
        {...restProps}>
        <Animated.View style={[progressStyle]} />
        <View>
          {children}
        </View>
      </View>
    );
  }
}
