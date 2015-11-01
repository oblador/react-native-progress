# react-native-progress

Progress indicators and spinners for React Native using ReactART. 

![progress-demo](https://cloud.githubusercontent.com/assets/378279/10870073/65c13a66-808f-11e5-863b-b9f2134fa3c6.gif)

**Note: Full android support will come when ReactART is ported to android.**

## Installation

`$ npm install react-native-progress --save`

### ReactART based components

`$ npm install art --save`

To use the `Pie` or `Circle` components, you need to include the ART library in your project. To do this, simply add the `ART.xcodeproj` (found in `node_modules/react-native/Libraries/ART`) to the **Libraries** group and add `libART.a` to **Link Binary With Libraries** under **Build Phases**. [More info and screenshots about how to do this is available in the React Native documentation](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#content).

Until [this pull request](https://github.com/facebook/react-native/pull/3308) to expose ReactART as a public API is merged, you will need to polyfill this because of packager limitations. Simply inject this code before requiring this module: 

```js
if(!React.ART) {
  React.ART = require('ReactNativeART');
}
```

## Usage

*Note: If you don't want the ReactART based components and it's dependencies, do a deep require instead: `var ProgressBar = require('react-native-progress/Bar');`.*

```js
var Progress = require('react-native-progress');

<Progress.Bar progress={0.3} width={200} />
<Progress.Pie progress={0.4} size={50} />
<Progress.Circle size={30} indeterminate={true} />
```

### Properties for all components

| Prop | Description | Default |
|---|---|---|
|**`animated`**|Wether or not to animate changes to `progress`. |`true`|
|**`indeterminate`**|If set to true, the indicator will spin and `progress` prop will be ignored. |`false`|
|**`progress`**|Progress of whatever the indicator is indicating. A number between 0 and 1. |`0`|
|**`color`**|Fill color of the indicator. |`rgba(0, 122, 255, 1)`|
|**`unfilledColor`**|Color of the remaining progress. |*None*|
|**`borderWidth`**|Width of outer border, set to `0` to remove. |`1`|
|**`borderColor`**|Color of outer border. |`color`|

### `Progress.Bar`

All of the props under *Properties* in addition to the following:

| Prop | Description | Default |
|---|---|---|
|**`width`**|Full width of the progress bar. |`150`|
|**`height`**|Height of the progress bar. |`6`|
|**`borderRadius`**|Rounding of corners, set to `0` to disable. |`4`|

### `Progress.Circle`

All of the props under *Properties* in addition to the following:

| Prop | Description | Default |
|---|---|---|
|**`size`**|Diameter of the circle. |`40`|
|**`thickness`**|Thickness inner circle. |`3`|

### `Progress.Pie`

All of the props under *Properties* in addition to the following:

| Prop | Description | Default |
|---|---|---|
|**`size`**|Diameter of the pie. |`40`|

## Example

See `Example` folder. 

## [Changelog](https://github.com/oblador/react-native-progress/releases)

## Todo
 - [x] Progress bar
 - [x] Circular progress indicator
 - [x] Pie progress indicator
 - [x] Animation
 - [x] Indeterminate state
 - [ ] Progress percentage text
 - [ ] Optional color change on success/failure
 - [ ] Snail/rainbow style spinners
 - [ ] Safari style navigation progress bar

## Thanks

To [Mandarin Drummond](https://github.com/MandarinConLaBarba) for giving me the NPM name. 

## License

[MIT License](http://opensource.org/licenses/mit-license.html). © Joel Arvidsson 2015
