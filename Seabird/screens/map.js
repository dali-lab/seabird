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
import { NavBar } from './../components/navBar';

const WEBVIEW_REF = 'webview';
const URL = 'https://m.dartmouth.edu/map/';
const NAVBAR_TEXT = 'Map';

var urls = []
var callCodes = [
  {schoolID: '58aa0107e437067dcebb0693', view: 'views', viewID: '58aa0107e437067dcebb069c'},
]

export default class Map extends Component {
  // Initialize the hardcoded data

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    }
  };

  onNavigationStateChange = (navState) => {
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

  GET = (codes) => {
    urls = []
    for (i = 0; i < codes.length; i++) {
      fetch('http://localhost:3000/api/schools/' + codes[i].schoolID + '/' + codes[i].view + '/' + codes[i].viewID)
      .then((response) => response.json())
      .then((responseJson) => {
          urls.push(responseJson.url)
          URL = responseJson.url
        })
      .catch((error =>
        console.log(error)
      ))
    }
  }

  render() {
    this.GET(callCodes)
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  /* Styles the entire container to hold multiple views */
  container: {
      flex: 1,
      backgroundColor: 'white',
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

AppRegistry.registerComponent('Map', () => Map);
