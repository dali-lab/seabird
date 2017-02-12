/*
 * mainView - Main View of the application
 * The user will land on this page after they choose those user type
 * DALI Lab - Seabird Apps
 * 1/15/17
 */
import React, { Component } from 'react';
import { Image, Animated, StyleSheet, LinkingIOS, ScrollView, ListView, View, Text, Navigator, AppRegistry, PropTypes, TouchableHighlight, WebView } from 'react-native';

import Root from './root';
import DDS from './dds';
import News from './news';
import Sports from './sports';
import Settings from './settings';
import More from './more';

var Datastore = require('react-native-local-mongodb')
  , db = new Datastore();

export default class Seabird extends Component {
  // Initialize the hardcoded data

  renderScene(route, navigator) {
    if (route.name == 'root') {
      return <Root navigator={navigator}/>
    }

    if (route.name == 'dds') {
      return <DDS navigator={navigator}/>
    }

    if (route.name == 'news') {
      return <News navigator={navigator}/>
    }

    if (route.name == 'sports') {
      return <Sports navigator={navigator}/>
    }

    if (route.name == 'settings') {
      return <Settings navigator={navigator}/>
    }

    if (route.name == 'more') {
      return <More navigator={navigator}/>
    }
  }

  render() {
    return (
        <Navigator
          initialRoute={{name: 'root', title: 'My Initial Scene', index: 0}}
          renderScene={this.renderScene.bind(this)}
        />
      )
    }
};

AppRegistry.registerComponent('Seabird', () => Seabird);
