import React, { Component } from 'react';
import _PropTypes from 'prop-types';
import {
  Animated,
  Easing,
  View,
  ViewPropTypes,
} from 'react-native';

const INDETERMINATE_WIDTH_FACTOR = 0.3;
const BAR_WIDTH_ZERO_POSITION = INDETERMINATE_WIDTH_FACTOR / (1 + INDETERMINATE_WIDTH_FACTOR);

const RNViewPropTypes = ViewPropTypes || View.propTypes;

export default class ProgressBar extends Component {
  static propTypes = {
    animated: _PropTypes.bool,
    borderColor: _PropTypes.string,
    borderRadius: _PropTypes.number,
    borderWidth: _PropTypes.number,
    children: _PropTypes.node,
    color: _PropTypes.string,
    height: _PropTypes.number,
    indeterminate: _PropTypes.bool,
    onLayout: _PropTypes.func,
    progress: _PropTypes.number,
    style: RNViewPropTypes.style,
    unfilledColor: _PropTypes.string,
    width: _PropTypes.number,
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

  constructor(props) {
    super(props);
    const progress = Math.min(Math.max(props.progress, 0), 1);
    this.state = {
      width: 0,
      progress: new Animated.Value(props.indeterminate ? INDETERMINATE_WIDTH_FACTOR : progress),
      animationValue: new Animated.Value(BAR_WIDTH_ZERO_POSITION),
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

  handleLayout = (event) => {
    if (!this.props.width) {
      this.setState({ width: event.nativeEvent.layout.width });
    }
    if (this.props.onLayout) {
      this.props.onLayout(event);
    }
  };

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

    const innerWidth = Math.max(0, width || this.state.width) - (borderWidth * 2);
    const containerStyle = {
      width,
      borderWidth,
      borderColor: borderColor || color,
      borderRadius,
      overflow: 'hidden',
      backgroundColor: unfilledColor,
    };
    const progressStyle = {
      backgroundColor: color,
      height,
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
        // Interpolation a temp workaround for https://github.com/facebook/react-native/issues/6278
        scaleX: this.state.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.0001, 1],
        }),
      }],
    };

    return (
      <View style={[containerStyle, style]} onLayout={this.handleLayout} {...restProps}>
        <Animated.View style={progressStyle} />
        {children}
      </View>
    );
  }
}
