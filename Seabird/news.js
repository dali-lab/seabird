import React, { Component } from 'react';
import { Image, Animated, StyleSheet, LinkingIOS, ScrollView, ListView, View, Text, Navigator, AppRegistry, PropTypes, TouchableHighlight, WebView } from 'react-native';


export default class News extends Component {
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
        source={{uri: 'https://dartmouth.edu/'}}
        style={{marginTop: 20}}
      />
    )
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('News', () => News);
