/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

// Polyfill React.ART if needed
if(!React.ART) {
  React.ART = require('ReactNativeART');
}

var Progress = require('react-native-progress');

var Example = React.createClass({
  getInitialState: function() {
    return {
      progress: 0,
      indeterminate: true,
    };
  },

  componentDidMount: function() {
    this.animate();
  },

  animate: function() {
    var progress = 0;
    this.setState({ progress });
    setTimeout(() => {
      this.setState({ indeterminate: false });
      setInterval(() => {
        progress += Math.random()/5;
        if(progress > 1) {
          progress = 1;
        }
        this.setState({ progress });
      }, 500);
    }, 2000);
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Progress Example</Text>
        <Progress.Bar
          style={styles.progress}
          progress={this.state.progress}
          indeterminate={this.state.indeterminate}
        />
        <Progress.Circle
          style={styles.progress}
          progress={this.state.progress}
          indeterminate={this.state.indeterminate}
        />
        <Progress.Pie
          style={styles.progress}
          progress={this.state.progress}
          indeterminate={this.state.indeterminate}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  progress: {
    margin: 10,
  },
});

AppRegistry.registerComponent('Example', () => Example);
