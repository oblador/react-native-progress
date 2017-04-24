import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Animated,
  Easing,
} from 'react-native';

export default function withAnimation(WrappedComponent, indeterminateProgress) {
  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  return class AnimatedComponent extends Component {
    static displayName = `withAnimation(${wrappedComponentName})`;
    static propTypes = {
      animated: PropTypes.bool,
      direction: PropTypes.oneOf(['ltr', 'rtl']),
      indeterminate: PropTypes.bool,
      progress: PropTypes.number.isRequired,
    };

    static defaultProps = {
      animated: true,
      direction: 'ltr',
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
      this.state.progress.addListener((event) => { this.progressValue = event.value; });
      this.state.rotation.addListener((event) => { this.rotationValue = event.value; });
      if (this.props.indeterminate) {
        this.spin();
        if (indeterminateProgress) {
          Animated.spring(this.state.progress, {
            toValue: indeterminateProgress,
          }).start();
        }
      }
    }

    componentWillUnmount() {
      this.state.progress.removeAllListeners();
      this.state.rotation.removeAllListeners();
    }

    componentWillReceiveProps(props) {
      if (props.indeterminate !== this.props.indeterminate) {
        if (props.indeterminate) {
          this.spin();
        } else {
          Animated.spring(this.state.rotation, {
            toValue: (this.rotationValue > 0.5 ? 1 : 0),
          }).start((endState) => {
            if (endState.finished) {
              this.state.rotation.setValue(0);
            }
          });
        }
      }
      const progress = (props.indeterminate
        ? indeterminateProgress || 0
        : Math.min(Math.max(props.progress, 0), 1)
      );
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

    spin() {
      this.state.rotation.setValue(0);
      Animated.timing(this.state.rotation, {
        toValue: this.props.direction === 'rtl' ? -1 : 1,
        duration: 1000,
        easing: Easing.linear,
        isInteraction: false,
      }).start((endState) => {
        if (endState.finished) {
          this.spin();
        }
      });
    }


    render() {
      return (
        <WrappedComponent
          {...this.props}
          progress={this.props.animated ? this.state.progress : this.props.progress}
          rotation={this.state.rotation}
        />
      );
    }
  };
}
