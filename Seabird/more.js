import React, { Component } from 'react';
import { Image, Animated, StyleSheet, LinkingIOS, ScrollView, ListView, View, Text, Navigator, AppRegistry, PropTypes, TouchableHighlight, WebView, TouchableOpacity } from 'react-native';
import { NavBar } from './components/navBar';

const NAVBAR_TEXT = 'More Modules';

export default class More extends Component {
  // Initialize the hardcoded data

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    }
  };

  render() {
    return (
      <View style={styles.container}>
      <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
      <ScrollView>
      </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  /* Styles the entire container to hold multiple views */
  container: {
      flex: 1,
    },

  /* Styles the back button */
  backIcon: {
    flex: 0,
    height: 20,
    resizeMode: 'center',
  },
});

AppRegistry.registerComponent('More', () => More);
