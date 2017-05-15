import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';

import { NavBar } from './../components/navBar';
import { NavWebView } from './../components/navWebView';

const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class AppWebView extends Component {

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({ name: routeName, transitionType });
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <NavWebView URL={this.props.url} navigator={this.props.navigator}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the header section that holds the school name and crest */
  mainHeader: {
    height: 60,
    marginBottom: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

});

AppRegistry.registerComponent('AppWebView', () => AppWebView);
