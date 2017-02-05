import React, { Component } from 'react';
import { Image, Animated, StyleSheet, LinkingIOS, ScrollView, ListView, View, Text, Navigator, AppRegistry, PropTypes, TouchableHighlight, WebView, TouchableOpacity } from 'react-native';

var WEBVIEW_REF = 'webview';

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
      canGoBack: navState.canGoBack
    });
  };

  onBack() {
    this.refs[WEBVIEW_REF].goBack();
  };

  navigate(routeName) {
    this.props.navigator.pop();
  };

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.mainHeader}>
      <TouchableHighlight onPress={this.navigate.bind(this, 'dds')}>
        <Image
          source={require('./Icons/Restaurant-50.png')}
          style={styles.mainIcon}
        />
        </TouchableHighlight>
        <Text style={styles.schoolTitle}>Dartmouth College</Text>
        <Image
          source={require('./Icons/Restaurant-50.png')}
          style={styles.mainIcon}
        />
      </View>
      <WebView
      ref={WEBVIEW_REF}
      style={{flex: 1}}
      onNavigationStateChange=
        {this.onNavigationStateChange.bind(this)}
      source={{uri: 'https://dartmouth.edu'}}
      />
      <View style={styles.bottomBar}>
        <TouchableOpacity
          disabled={!this.state.canGoBack}
          onPress={this.onBack.bind(this)}
          >
          <Text style={styles.bottomBarText}>Go Back</Text>
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
    justifyContent: 'space-between',
  },

  /* Style for the school title text */
  schoolTitle: {
    fontSize: 23,
    fontFamily: 'System',
    fontWeight: '300',
    color: '#fff',
    letterSpacing: -0.56,
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
