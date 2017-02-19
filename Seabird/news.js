import React, { Component } from 'react';
import { Image, Animated, StyleSheet, LinkingIOS, ScrollView, ListView, View, Text, Navigator, AppRegistry, PropTypes, TouchableHighlight, WebView, TouchableOpacity } from 'react-native';

const WEBVIEW_REF = 'webview';

const URL = 'http://thedartmouth.com';

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
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url
    });
  };

  goBack() {
    this.refs[WEBVIEW_REF].goBack();
  };

  goForward = () => {
    this.refs[WEBVIEW_REF].goForward();
  };

  navigatePop(routeName) {
    this.props.navigator.pop();
  };

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.mainHeader}>
      <TouchableHighlight onPress={this.navigatePop.bind(this, 'news')}>
        <Image
          source={require('./Icons/Back-50-White.png')}
          style={styles.backIcon}
        />
        </TouchableHighlight>
        <Text style={styles.schoolTitle}>News</Text>
      </View>
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
          onPress={this.goBack.bind(this)}
          >
          <Image
            source={require('./Icons/Back-50-White.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!this.state.forwardButtonEnabled}
          onPress={this.goForward}
          >
          <Image
            source={require('./Icons/Forward-50-White.png')}
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

  /* Style for the header section that holds the school name and crest */
  mainHeader: {
    width: 400,
    height: 70,
    backgroundColor: '#2b2b2b',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  /* Style for the school title text */
  schoolTitle: {
    fontSize: 23,
    fontFamily: 'System',
    fontWeight: '300',
    color: '#fff',
    letterSpacing: -0.56,
  },

  /* Styles the back button */
  backIcon: {
    flex: .5,
    height: 20,
    resizeMode: 'center',
  },

  /* Styles the forward button */
  forwardIcon: {
    flex: .5,
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

AppRegistry.registerComponent('News', () => News);
