import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  WebView,
  TouchableOpacity,
} from 'react-native';
import { NavBar } from './components/navBar';

const WEBVIEW_REF = 'webview';
const URL = 'http://thedartmouth.com';
const NAVBAR_TEXT = 'News';

export default class News extends Component {
  // Initialize the hardcoded data

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    }
  };

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward,
      url: navState.url
    });
  };

  goBack = () => {
    this.refs[WEBVIEW_REF].goBack();
  };

  goForward = () => {
    this.refs[WEBVIEW_REF].goForward();
  };

  render() {
    return (
      <View style={styles.container}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
        <WebView
        ref={WEBVIEW_REF}
        style={{flex: 1, marginTop: -2}}
        onNavigationStateChange=
          {this.onNavigationStateChange.bind(this)}
        source={{uri: URL}}
        />
        <View style={styles.bottomBar}>
          <TouchableOpacity
            disabled={!this.state.canGoBack}
            onPress={this.goBack}
            >
            <Image
              source={require('./Icons/Back-50-Gray.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!this.state.canGoForward}
            onPress={this.goForward}
            >
            <Image
              source={require('./Icons/Forward-50-Gray.png')}
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
    flex: 1,
    height: 20,
    resizeMode: 'center',
  },

  /* Styles the forward button */
  forwardIcon: {
    flex: 1,
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
    backgroundColor: '#EAEAEA',
  }
});

AppRegistry.registerComponent('News', () => News);
