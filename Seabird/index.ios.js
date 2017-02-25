/*
 * mainView - Main View of the application
 * The user will land on this page after they choose those user type
 * DALI Lab - Seabird Apps
 * 1/15/17
 */
import React, { Component } from 'react';
import { 
  StyleSheet,
  LinkingIOS,
  Navigator,
  AppRegistry,
} from 'react-native';

import Root from './root';
import DDS from './dds';
import News from './news';
import Sports from './sports';
import Settings from './settings';
import More from './more';
import Customize from './customize';
import Schedule from './schedule';

export default class Seabird extends Component {
  // Initialize the hardcoded data

  constructor(props) {
    super(props);
    this.configureScene = this.configureScene.bind(this);
  };

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

    if (route.name == 'customize') {
      return <Customize navigator={navigator}/>
    }

    if (route.name == 'schedule') {
      return <Schedule navigator={navigator}/>
    }
  }

  configureScene(route, routeStack){
      if(route.transitionType === 'up') {
        return Navigator.SceneConfigs.VerticalUpSwipeJump
      }
      if(route.transitionType === 'down') {
        return Navigator.SceneConfigs.VerticalDownSwipeJump
      }
      return Navigator.SceneConfigs.PushFromRight
  }

  render() {
    return (
        <Navigator
          initialRoute={{name: 'root', title: 'My Initial Scene', index: 0}}
          renderScene={this.renderScene.bind(this)}
          configureScene={ this.configureScene }
        />
      )
    }
};


AppRegistry.registerComponent('Seabird', () => Seabird);
