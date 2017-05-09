import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  WebView,
} from 'react-native';

import { NavBar } from './../components/navBar';
import { NavWebView } from './../components/navWebView';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';
import LinearGradient from 'react-native-linear-gradient';

const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

const { height, width } = Dimensions.get('window');
export default class AppWebView extends Component {

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({ name: routeName, transitionType });
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavBar navigator={this.props.navigator} text="TITLE" />
        <NavWebView URL="https://canvas.dartmouth.edu" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the header section that holds the school name and crest */
  mainHeader: {
    width,
    height: 60,
    marginBottom: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

});

AppRegistry.registerComponent('AppWebView', () => AppWebView);
