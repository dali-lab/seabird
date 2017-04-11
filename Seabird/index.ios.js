/*
 * mainView - Main View of the application
 * The user will land on this page after they choose those user type
 * DALI Lab - Seabird Apps
 * 1/15/17
 */
import React, { Component } from 'react';
import {
  Header,
  Link,
  nativeHistory,
  Route,
  Router,
  StackRoute,
  withRouter,
} from 'react-router-native';
import { Navigator, AppRegistry } from 'react-native';

import Root from './root';
import DDS from './dds';
import News from './news';
import Events from './events';
import EventsCalendar from './eventscalendar';
import Sports from './sports';
import Settings from './settings';
import More from './more';
import Customize from './customize';
import Schedule from './schedule';
import Tutorial from './tutorial';
import Map from './map';
import EventDetail from './eventdetail';
import ComboKeeper from './combokeeper';
import Dominos from './dominos';
import Testing from './testing';

export default class Seabird extends Component {
  // Initialize the hardcoded data

  constructor(props) {
    super(props);
  }

  renderScene = (route, navigator) => {
    if (route.name === 'root') {
      return <Root navigator={navigator} />;
    }

    if (route.name === 'dds') {
      return <DDS navigator={navigator} />;
    }

    if (route.name === 'news') {
      return <News navigator={navigator} />;
    }

    if (route.name === 'events') {
      return <Events navigator={navigator} />;
    }

    if (route.name === 'eventscalendar') {
      return <EventsCalendar navigator={navigator} />;
    }

    if (route.name === 'sports') {
      return <Sports navigator={navigator} />;
    }

    if (route.name === 'settings') {
      return <Settings navigator={navigator} />;
    }

    if (route.name === 'more') {
      return <More navigator={navigator} />;
    }

    if (route.name === 'customize') {
      return <Customize navigator={navigator} />;
    }

    if (route.name === 'schedule') {
      return <Schedule navigator={navigator} />;
    }

    if (route.name == 'tutorial') {
      return <Tutorial navigator={navigator} />;
    }

    if (route.name == 'map') {
      return <Map navigator={navigator} />;
    }

    if (route.name === 'eventdetail') {
      return <EventDetail navigator={navigator} />;
    }

    if (route.name === 'combokeeper') {
      return <ComboKeeper navigator={navigator} />;
    }

    if (route.name === 'dominos') {
      return <Dominos navigator={navigator} />;
    }

    if (route.name === 'testing') {
      return <Testing navigator={navigator} />;
    }
  }

  configureScene = (route, routeStack) => {
    if (route.transitionType === 'up') {
      return Navigator.SceneConfigs.VerticalUpSwipeJump;
    }
    if (route.transitionType === 'down') {
      return Navigator.SceneConfigs.VerticalDownSwipeJump;
    }
    return Navigator.SceneConfigs.PushFromRight;
  }

  render() {
    return (<Navigator
      initialRoute={{
        name: 'root',
        title: 'My Initial Scene',
        index: 0,
      }} renderScene={this.renderScene} configureScene={this.configureScene}
    />);
  }
}

AppRegistry.registerComponent('Seabird', () => Seabird);
