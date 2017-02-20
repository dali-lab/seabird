import React, { Component } from 'react';
import { Image, Animated, StyleSheet, LinkingIOS, ScrollView, ListView, View, Text, Navigator, AppRegistry, PropTypes, TouchableHighlight, WebView, TouchableOpacity } from 'react-native';
import { NavBar } from './navBar';

const WEBVIEW_REF = 'webview';
const URL = 'http://dartmouthsports.com';
const NAVBAR_TEXT = 'Sports';

export default class Sports extends Component {
  // Initialize the hardcoded data

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    }
  };

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  };

  onBack() {
    this.refs[WEBVIEW_REF].goBack();
  };

  onForward() {
    this.refs[WEBVIEW_REF].goForward();
  };

  render() {
    return (
      <View style={styles.container}>
      <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
      <WebView
      ref={WEBVIEW_REF}
      style={{flex: 1}}
      onNavigationStateChange=
        {this.onNavigationStateChange.bind(this)}
      source={{uri: URL}}
      />
      <View style={styles.bottomBar}>
        <TouchableOpacity
          disabled={!this.state.canGoBack}
          onPress={this.onBack.bind(this)}
          >
          <Image
            source={require('./Icons/Back-50-White.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!this.state.canGoForward}
          onPress={this.onForward.bind(this)}
          >
          <Image
            source={require('./Icons/Back-50-White.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>
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

  /* Styles the bottom web view navigation banner */
  bottomBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: '#2b2b2b',
  }
});

AppRegistry.registerComponent('Sports', () => Sports);
