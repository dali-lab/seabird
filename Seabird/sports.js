import React, { Component } from 'react';
import { Image, Animated, StyleSheet, LinkingIOS, ScrollView, ListView, View, Text, Navigator, AppRegistry, PropTypes, TouchableHighlight, WebView } from 'react-native';



export default class Sports extends Component {
  // Initialize the hardcoded data

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    }
  };

  render() {
    return (
      <WebView
        source={{uri: 'http://www.dartmouthsports.com'}}
        style={{marginTop: 20}}
      />
    )
  }
}

AppRegistry.registerComponent('Sports', () => Sports);
