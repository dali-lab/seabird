import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Animated,
    WebView,
} from 'react-native';
import { NavBar } from './components/navBar';
import { NavWebView } from './components/navWebView';

const WEBVIEW_REF = 'webview';
const URL = 'http://thedartmouth.com';
const NAVBAR_TEXT = 'News';

export default class News extends Component {s

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
        <NavWebView source={{ uri: URL }} ref={WEBVIEW_REF} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    /* Styles the entire container to hold multiple views */
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('News', () => News);
