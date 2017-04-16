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
import News from './web';
import Events from './events';
import EventsCalendar from './eventscalendar';
import Settings from './settings';
import More from './more';
import Customize from './customize';
import Schedule from './schedule';
import Tutorial from './tutorial';
import Map from './map';
import EventDetail from './eventdetail';
import ComboKeeper from './combokeeper';
import Testing from './testing';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

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
    OneSignal.sendTags({"key": "value", "key2": "value2"});
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
    if (route.name === 'root') {
      return <Root navigator={navigator} />;
    }

    if (route.name === 'dds') {
      return <DDS navigator={navigator} />;
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

    if (route.name === 'web') {
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

/*const Home = () => (
  <Root />
);

const Seabird = () => (
  <NativeRouter>
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Route exact path="/" component={Home} />
    </View>
  </NativeRouter>
);*/

AppRegistry.registerComponent('Seabird', () => Seabird);
