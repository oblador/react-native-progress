import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Animated,
  Easing,
} from 'react-native';

export default function makeAnimatable(component, indeterminateProgress) {
  const AnimatedComponent = Animated.createAnimatedComponent(component);
  return class AnimatableComponent extends Component {
    static propTypes = {
      animated: PropTypes.bool,
      direction: PropTypes.oneOf(['clockwise', 'counter-clockwise']),
      indeterminate: PropTypes.bool,
      progress: PropTypes.number.isRequired,
    };

    static defaultProps = {
      animated: true,
      direction: 'clockwise',
      indeterminate: false,
      progress: 0,
    };

    constructor(props) {
      super(props);

      const progress = Math.min(Math.max(props.progress, 0), 1);
      this.state = {
        animationValue: new Animated.Value(progress),
        progress,
        rotation: new Animated.Value(0),
      };
    }

    componentDidMount() {
      this.state.animationValue.addListener(event => this.setState({ progress: event.value }));
      this.state.rotation.addListener(event => { this._rotation = event.value; });
      if (this.props.indeterminate) {
        this.spin();
        if (indeterminateProgress) {
          Animated.spring(this.state.animationValue, {
            toValue: indeterminateProgress,
          }).start();
        }
      }
    }

    componentWillUnmount() {
      this.state.animationValue.removeAllListeners();
    }

    componentWillReceiveProps(props) {
      if (props.indeterminate !== this.props.indeterminate) {
        if (props.indeterminate) {
          this.spin();
        } else {
          Animated.spring(this.state.rotation, {
            toValue: (this._rotation > 0.5 ? 1 : 0),
          }).start(endState => {
            if (endState.finished) {
              this.state.rotation.setValue(0);
            }
          });
        }
      }
      const progress = (props.indeterminate ? indeterminateProgress || 0 : Math.min(Math.max(props.progress, 0), 1));
      if (progress !== this.state.progress) {
        if (props.animated) {
          Animated.spring(this.state.animationValue, {
            toValue: progress,
            bounciness: 0,
          }).start();
        } else {
          this.setState({ progress });
        }
      }
    }

    spin() {
      this.state.rotation.setValue(0);
      Animated.timing(this.state.rotation, {
        toValue: this.props.direction === 'counter-clockwise' ? -1 : 1,
        duration: 1000,
        easing: Easing.linear,
        isInteraction: false,
      }).start(endState => {
        if (endState.finished) {
          this.spin();
        }
      });
    }


    render() {
      const { progress, size, style, children, ...props } = this.props;
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
            }),
          }],
        }, style]}
        {...props}>{children}</AnimatedComponent>);
    }
  };
}
