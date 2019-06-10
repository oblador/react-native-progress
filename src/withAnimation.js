import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';

export default function withAnimation(WrappedComponent, indeterminateProgress) {
  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  return class AnimatedComponent extends Component {
    static displayName = `withAnimation(${wrappedComponentName})`;

    static propTypes = {
      animated: PropTypes.bool,
      direction: PropTypes.oneOf(['clockwise', 'counter-clockwise']),
      indeterminate: PropTypes.bool,
      indeterminateAnimationDuration: PropTypes.number,
      progress: PropTypes.number,
    };

    static defaultProps = {
      animated: true,
      indeterminateAnimationDuration: 1000,
      indeterminate: false,
      progress: 0,
    };

    constructor(props) {
      super(props);

      this.progressValue = Math.min(Math.max(props.progress, 0), 1);
      this.rotationValue = 0;
      this.state = {
        progress: new Animated.Value(this.progressValue),
        rotation: new Animated.Value(this.rotationValue),
      };
    }

    componentDidMount() {
      this.state.progress.addListener(event => {
        this.progressValue = event.value;
      });
      this.state.rotation.addListener(event => {
        this.rotationValue = event.value;
      });
      if (this.props.indeterminate) {
        this.spin();
        if (indeterminateProgress) {
          Animated.spring(this.state.progress, {
            toValue: indeterminateProgress,
          }).start();
        }
      }
    }

    componentWillReceiveProps(props) {
      if (props.indeterminate !== this.props.indeterminate) {
        if (props.indeterminate) {
          this.spin();
        } else {
          Animated.spring(this.state.rotation, {
            toValue: this.rotationValue > 0.5 ? 1 : 0,
          }).start(endState => {
            if (endState.finished) {
              this.state.rotation.setValue(0);
            }
          });
        }
      }
      const progress = props.indeterminate
        ? indeterminateProgress || 0
        : Math.min(Math.max(props.progress, 0), 1);
      if (progress !== this.progressValue) {
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

    componentWillUnmount() {
      this.state.progress.removeAllListeners();
      this.state.rotation.removeAllListeners();
    }

    spin() {
      this.state.rotation.setValue(0);
      Animated.timing(this.state.rotation, {
        toValue: this.props.direction === 'counter-clockwise' ? -1 : 1,
        duration: this.props.indeterminateAnimationDuration,
        easing: Easing.linear,
        isInteraction: false,
      }).start(endState => {
        if (endState.finished) {
          this.spin();
        }
      });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          progress={
            this.props.animated ? this.state.progress : this.props.progress
          }
          rotation={this.state.rotation}
        />
      );
    }
  };
}
