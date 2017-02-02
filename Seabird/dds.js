import React, { Component } from 'react';
import { Image, Animated, StyleSheet, LinkingIOS, ScrollView, ListView, View, Text, Navigator, AppRegistry, PropTypes, TouchableHighlight, WebView } from 'react-native';

export default class DDS extends Component {
  // Initialize the hardcoded data

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    }
  };

  render() {
    return (
      <View>
        <Text>DDS
        </Text>
      </View>
    )
  }
};

AppRegistry.registerComponent('DDS', () => DDS);
