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
import EventItem from './components/eventItem';
import OneSignal from 'react-native-onesignal';

import Login from './screens/login';
import Root from './screens/root';
import Dining from './screens/dining';
import News from './screens/web';
import Events from './screens/events';
import EventsCalendar from './screens/eventscalendar';
import Settings from './screens/settings';
import More from './screens/more';
import Customize from './screens/customize';
import Schedule from './screens/schedule';
import Tutorial from './screens/tutorial';
import Map from './screens/map';
import EventDetail from './screens/eventdetail';
import ComboKeeper from './screens/combokeeper';
import Testing from './screens/testing';

export default class Seabird extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('registered', this.onRegistered);
    OneSignal.addEventListener('ids', this.onIds);
    // Sending multiple tags
    OneSignal.sendTags({"UserID": "12345", "UserName": "Sean", "UserYear": "2017"});
    // Calling promptLocation
    OneSignal.promptLocation();
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onRegistered(notifData) {
    console.log("Device had been registered for push notifications!", notifData);
  }

  onIds(device) {
	   console.log('Device info: ', device);
  }

  renderScene = (route, navigator) => {
    if (route.name === 'login') {
      return <Login navigator={navigator} />;
    }

    if (route.name === 'root') {
      return <Root navigator={navigator} />;
    }

    if (route.name === 'dining') {
      return <Dining navigator={navigator} />;
    }

    if (route.name === 'web') {
      return <News navigator={navigator} />;
    }

    if (route.name === 'events') {
      return <Events navigator={navigator} />;
    }

    if (route.name === 'eventscalendar') {
      return <EventsCalendar navigator={navigator} />;
    }

    if (route.name === 'web') {
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

    if (route.name === 'tutorial') {
      return <Tutorial navigator={navigator} />;
    }

    if (route.name === 'map') {
      return <Map navigator={navigator} />;
    }

    if (route.name === 'eventdetail') {
      return <EventDetail navigator={navigator} />;
    }

    if (route.name === 'combokeeper') {
      return <ComboKeeper navigator={navigator} />;
    }

    if (route.name === 'web') {
      return <Dominos navigator={navigator} />;
    }

    if (route.name === 'testing') {
      return <Testing navigator={navigator} />;
    }

    if (route.name === 'dining') {
      return <Dining navigator={navigator} />;
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
  };

  render() {
    return (
    <Navigator
      initialRoute={{
        name: 'login',
        title: 'My Initial Scene',
        index: 0,
      }} renderScene={this.renderScene} configureScene={this.configureScene}
    />
  );
  }
}

AppRegistry.registerComponent('Seabird', () => Seabird);
