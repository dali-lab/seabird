import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    ListView,
    Animated,
    WebView,
    TouchableOpacity,
} from 'react-native';
import { NavBar } from './components/navBar';
import { NavWebView } from './components/navWebView';

const WEBVIEW_REF = 'webview';
const URL = 'http://dartmouthsports.com';
const NAVBAR_TEXT = 'Sports';

export default class Sports extends Component {
    // Initialize the hardcoded data

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
    backgroundColor: '#EAEAEA',
  },
});

AppRegistry.registerComponent('Sports', () => Sports);
