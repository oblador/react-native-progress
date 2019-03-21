declare module 'react-native-progress' {
  import React from 'react';
  import { TextStyle, ViewProperties } from 'react-native';

  /**
   * Properties for all `Progress` components.
   *
   * @export
   * @interface DefaultPropTypes
   * @extends {ViewProperties}
   */
  export interface DefaultPropTypes extends ViewProperties {
    /**
     * Whether or not to animate changes to progress.
     *
     * @type {boolean}
     * @memberof DefaultPropTypes
     * @default true
     */
    animated?: boolean;

    /**
     * If set to true, the indicator will spin and progress prop will be ignored.
     *
     * @type {boolean}
     * @memberof DefaultPropTypes
     * @default false
     */
    indeterminate?: boolean;

    /**
     * Progress of whatever the indicator is indicating. A number between `0` and `1`
     *
     * @type {(0 | 1)}
     * @memberof DefaultPropTypes
     * @default 0
     */
    progress?: number;

    /**
     * Fill color of the indicator.
     *
     * @type {string}
     * @memberof DefaultPropTypes
     * @default rgba(0, 122, 255, 1)
     */
    color?: string;

    /**
     * Color of the remaining progress.
     *
     * @type {string}
     * @memberof DefaultPropTypes
     * @default None
     */
    unfilledColor?: string;

    /**
     * Width of outer border, set to `0` to remove.
     *
     * @type {number}
     * @memberof DefaultPropTypes
     * @default 1
     */
    borderWidth?: number;

    /**
     * Color of outer border.
     *
     * @type {string}
     * @memberof DefaultPropTypes
     * @default color
     */
    borderColor?: string;
  }

  /**
   * Properties for `Bar` components
   *
   * @export
   * @interface BarPropTypes
   * @extends {DefaultPropTypes}
   */
  export interface BarPropTypes extends DefaultPropTypes {
    /**
     * Full width of the progress bar, set to null to use automatic flexbox sizing.
     *
     * @type {number}
     * @memberof BarPropTypes
     * @default 150
     */
    width?: number | null;

    /**
     * Height of the progress bar.
     *
     * @type {number}
     * @memberof BarPropTypes
     * @default 6
     */
    height?: number;

    /**
     * Rounding of corners, set to `0` to disable.
     *
     * @type {number}
     * @memberof BarPropTypes
     * @default 4
     */
    borderRadius?: number;

    /**
     * Use native driver for the animations.
     *
     * @type {boolean}
     * @memberof BarPropTypes
     * @default false
     */
    useNativeDriver?: boolean;

    /**
     * Config that is passed into the Animated function
     *
     * @type {{}}
     * @memberof BarPropTypes
     * @default { bounciness: 0 }
     */
    animationConfig?: {};

    /**
     * Animation type to animate the progress, one of: `decay`, `timing`, `spring`
     *
     * @type {('decay' | 'timing' | 'spring')}
     * @memberof BarPropTypes
     * @default spring
     */
    animationType?: 'decay' | 'timing' | 'spring';

    /**
     * Sets animation duration in milliseconds when indeterminate is set.
     *
     * @type {number}
     * @memberof BarPropTypes
     * @default 1000
     */
    indeterminateAnimationDuration?: number;
  }

  /**
   * Properties for `Circle` components
   *
   * @export
   * @interface CirclePropTypes
   * @extends {DefaultPropTypes}
   */
  export interface CirclePropTypes extends DefaultPropTypes {
    /**
     * Diameter of the circle.
     *
     * @type {number}
     * @memberof CirclePropTypes
     * @default 40
     */
    size?: number;

    /**
     * Thickness of the inner circle.
     *
     * @type {number}
     * @memberof CirclePropTypes
     * @default 3
     */
    thickness?: number;

    /**
     * Whether or not to show a text representation of current progress.
     *
     * @type {boolean}
     * @memberof CirclePropTypes
     * @default false
     */
    showsText?: boolean;

    /**
     * A function returning a string to be displayed for the textual representation.
     *
     * @memberof CirclePropTypes
     * @default See source
     */
    formatText?: (progress: number) => void;

    /**
     * Styles for progress text, defaults to a same `color` as circle and `fontSize` proportional to `size` prop.
     *
     * @type {TextStyle}
     * @memberof CirclePropTypes
     * @default None
     */
    textStyle?: TextStyle;

    /**
     * Whether or not to respect device font scale setting.
     *
     * @type {boolean}
     * @memberof CirclePropTypes
     * @default true
     */
    allowFontScaling?: boolean;

    /**
     * Direction of the circle `clockwise` or `counter-clockwise`.
     *
     * @type {('clockwise' | 'counter-clockwise')}
     * @memberof CirclePropTypes
     * @default clockwise
     */
    direction?: 'clockwise' | 'counter-clockwise';

    /**
     * Stroke Cap style for the circle `butt`, `square` or `round`.
     *
     * @type {('butt' | 'square' | 'round')}
     * @memberof CirclePropTypes
     * @default butt
     */
    strokeCap?: 'butt' | 'square' | 'round';
  }

  /**
   * Properties for `PiePropTypes` components
   *
   * @export
   * @interface PiePropTypes
   * @extends {DefaultPropTypes}
   */
  export interface PiePropTypes extends DefaultPropTypes {
    /**
     * Diameter of the pie.
     *
     * @type {number}
     * @memberof PiePropTypes
     * @default 40
     */
    size?: number;
  }

  /**
   * Properties for `CircleSnailPropTypes` components
   *
   * @export
   * @interface CircleSnailPropTypes
   * @extends {DefaultPropTypes}
   */
  export interface CircleSnailPropTypes extends DefaultPropTypes {
    /**
     * If the circle should animate.
     *
     * @type {boolean}
     * @memberof CircleSnailPropTypes
     * @default true
     */
    animating?: boolean;

    /**
     * If the circle should be removed when not animating.
     *
     * @type {boolean}
     * @memberof CircleSnailPropTypes
     * @default true
     */
    hidesWhenStopped?: boolean;

    /**
     * Diameter of the circle.
     *
     * @type {number}
     * @memberof CircleSnailPropTypes
     * @default 40
     */
    size?: number;

    /**
     * Color of the circle, use an array of colors for rainbow effect.
     *
     * @type {string}
     * @memberof CircleSnailPropTypes
     * @default rgba(0, 122, 255, 1)
     */
    color?: string;

    /**
     * Thickness of the circle.
     *
     * @type {number}
     * @memberof CircleSnailPropTypes
     * @default 3
     */
    thickness?: number;

    /**
     * Duration of animation.
     *
     * @type {number}
     * @memberof CircleSnailPropTypes
     * @default 1000
     */
    duration?: number;

    /**
     * Duration of spin (orbit) animation.
     *
     * @type {number}
     * @memberof CircleSnailPropTypes
     * @default 5000
     */
    spinDuration?: number;

    /**
     * Stroke Cap style for the circle `butt`, `square` or `round`
     *
     * @type {('butt' | 'square' | 'round')}
     * @memberof CircleSnailPropTypes
     * @default round
     */
    strokeCap?: 'butt' | 'square' | 'round';
  }

  export class Bar extends React.Component<BarPropTypes> {}
  export class Circle extends React.Component<CirclePropTypes> {}
  export class Pie extends React.Component<PiePropTypes> {}
  export class CircleSnail extends React.Component<CircleSnailPropTypes> {}
}
