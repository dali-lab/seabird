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
  AsyncStorage,
} from 'react-router-native';
import { Navigator, AppRegistry } from 'react-native';
import EventItem from './components/eventItem';
//import OneSignal from 'react-native-onesignal';
import Firebase from './firebase/firebase';
import Database from './firebase/database';

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
import BuildingHours from './screens/buildingHours';
import Food from './screens/food';
import Signup from './screens/signup';
import ModuleDetails from './screens/moduleDetail';
import AppWebView from './screens/appWebView';

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

let email = '';
let password = '';
let alreadyLogin = false;

const NoBackSwipeFloatRight ={
  ...Navigator.SceneConfigs.FloatFromRight,
    gestures: {
      pop: {},
    },
};

const NoBackSwipePushRight ={
  ...Navigator.SceneConfigs.PushFromRight,
    gestures: {
      pop: {},
    },
};

const NoBackSwipePushLeft ={
  ...Navigator.SceneConfigs.PushFromLeft,
    gestures: {
      pop: {},
    },
};

const NoBackSwipeFloatLeft ={
  ...Navigator.SceneConfigs.FloatFromLeft,
    gestures: {
      pop: {},
    },
};

const NoBackSwipeUp ={
  ...Navigator.SceneConfigs.VerticalUpSwipeJump,
    gestures: {
      pop: {},
    },
};

const NoBackSwipeDown ={
  ...Navigator.SceneConfigs.VerticalDownSwipeJump,
    gestures: {
      pop: {},
    },
};
export default class Seabird extends Component {

    constructor( props ) {
      super( props );
      Firebase.initialize( );
      this.updateViewName = this.updateViewName.bind(this)
      this.passEvent = this.passEvent.bind(this)
      this.updateHome = this.updateHome.bind(this)
      this.orderChanged = this.orderChanged.bind(this)
      this.state = {
        alreadyLogin: false,
        viewName: '',
        currentEvent: '',
        HOME_PORTALS: [
          {
            txtName: 'Dining',
            navName: 'dining',
            imgName:  require('./Icons/Restaurant-50-White.png'),
          }, {
            txtName: 'Events',
            navName: 'events',
            imgName: require('./Icons/T-Shirt-50-White.png'),
          }, {
            txtName: 'WebView',
            navName: 'web',
            imgName: require('./Icons/News-50-White.png'),
          }, {
            txtName: 'Campus Map',
            navName: 'map',
            imgName: require('./Icons/Map-Marker-50-White.png'),
          }, {
            txtName: 'Schedule',
            navName: 'schedule',
            imgName: require('./Icons/Calendar-50-White.png'),
          }, {
            txtName: 'WebView',
            navName: 'web',
            imgName: require('./Icons/News-50-White.png'),
          }, {
            txtName: 'Green Print',
            navName: 'tutorial',
            imgName: require('./Icons/Print-50-White.png'),
          }, {
            txtName: 'Food',
            navName: 'food',
            imgName: require('./Icons/Restaurant-50-White.png'),
          }, {
            txtName: 'Combo Keeper',
            navName: 'combokeeper',
            imgName: require('./Icons/Sport-50-White.png'),
          }, {
            txtName: 'Building Hours',
            navName: 'buildingHours',
            imgName: require('./Icons/News-50-White.png'),
          }, {
            txtName: 'Academics',
            navName: 'academics',
            imgName: require('./Icons/News-50-White.png'),
          },
        ],
      }
    }

    userIsSignedIn = () => {
      console.log('USER IS ALREADY SIGNED IN');
      alreadyLogin = true
      console.log(Firebase.getUser());
      //this.props.navigator.push({nasme: 'root'});
    }

    componentWillMount() {
      Firebase.isUserSignedIn((value) => {
        this.setState({ alreadyLogin: value })
      })
    }

    /*componentWillMount( ) {
      OneSignal.addEventListener( 'received', this.onReceived );
      OneSignal.addEventListener( 'opened', this.onOpened );
      OneSignal.addEventListener( 'registered', this.onRegistered );
      OneSignal.addEventListener( 'ids', this.onIds );
      // Sending multiple tags
      OneSignal.sendTags({ "UserID": "12345", "UserName": "Sean", "UserYear": "2017" });
      // Calling promptLocation
      OneSignal.promptLocation( );
    }

    componentWillUnmount( ) {
      OneSignal.removeEventListener( 'received', this.onReceived );
      OneSignal.removeEventListener( 'opened', this.onOpened );
      OneSignal.removeEventListener( 'registered', this.onRegistered );
      OneSignal.removeEventListener( 'ids', this.onIds );
    }

    onReceived( notification ) {
      // console.log("Notification received: ", notification);
    }

    onOpened( openResult ) {
      // console.log('Message: ', openResult.notification.payload.body);
      // console.log('Data: ', openResult.notification.payload.additionalData);
      // console.log('isActive: ', openResult.notification.isAppInFocus);
      // console.log('openResult: ', openResult);
    }

    onRegistered( notifData ) {
      // console.log("Device had been registered for push notifications!", notifData);
    }

    onIds( device ) {
      // console.log('Device info: ', device);
    }*/

    updateViewName(name) {
      this.setState({ viewName: name })
    }

    passEvent(userEvent) {
      this.setState({ currentEvent: userEvent})
    }

    updateHome(newOrder) {
      let newHomeOrder = JSON.parse(newOrder)
      this.setState({ HOME_PORTALS: newHomeOrder })
    }

    orderChanged(newOrder) {
      /* Changes the home page order */
      this.setState({ HOME_PORTALS: newOrder })
      Database.setUserHomeOrder(JSON.stringify(newOrder));
    }

    /* Switch cases */

    renderScene = ( route, navigator ) => {
      switch (route.name) {
        case 'login':
          return <Login navigator={navigator}
          updateHome={this.updateHome}/>;

        case 'root':
          return <Root navigator={navigator} HOME_PORTALS={this.state.HOME_PORTALS}
          updateHome={this.updateHome}/>;

        case 'dining':
          return <Dining navigator={navigator}/>;

        case 'web':
          return <Map navigator={navigator}/>;

        case 'events':
          return <Events navigator={navigator}
          passEvent={this.passEvent}/>;

        case 'eventsdetails':
          return <EventDetail navigator={navigator}
          currentEvent={this.state.currentEvent}/>;

        case 'eventscalendar':
          return <EventsCalendar navigator={navigator}/>;

        case 'settings':
          return <Settings navigator={navigator}/>;

        case 'more':
          return <More navigator={navigator}/>;

        case 'customize':
          return <Customize navigator={navigator} orderChanged={this.orderChanged} HOME_PORTALS={this.state.HOME_PORTALS}/>;

        case 'schedule':
          return <Schedule navigator={navigator}/>;

        case 'tutorial':
          return <Tutorial navigator={navigator}/>;

        case 'map':
          return <Map navigator={navigator}/>;

        case 'eventdetail':
          return <EventDetail navigator={navigator}/>;

        case 'combokeeper':
          return <ComboKeeper navigator={navigator}/>;

        case 'buildingHours':
          return <BuildingHours navigator={navigator}/>;

        case 'dining':
          return <Dining navigator={navigator}/>;

        case 'food':
          return <Food navigator={navigator}/>;

        case 'signup':
          return <Signup navigator={navigator}/>;

        case 'academics':
          return <ModuleDetails navigator={navigator}
          viewName={this.state.viewName}
          updateViewName={this.updateViewName}/>

        case 'banner':
          return <AppWebView navigator={navigator}
          viewName={this.state.viewName}
          updateViewName={this.updateViewName}/>

        case 'canvas':
          return <AppWebView navigator={navigator}
          viewName={this.state.viewName}
          updateViewName={this.updateViewName}/>

        case 'timetable':
          return <AppWebView navigator={navigator}
          viewName={this.state.viewName}
          updateViewName={this.updateViewName}/>
      }
    };

    configureScene = ( route, routeStack ) => {
      switch (route.transitionType) {
        case 'up':
          return NoBackSwipeUp;

        case 'down':
          return NoBackSwipeDown;

        case 'floatRight':
          return NoBackSwipeFloatRight;

        case 'floatLeft':
          return NoBackSwipeFloatLeft;

        case 'left':
          return NoBackSwipePushLeft;

        default:
          return NoBackSwipePushRight;
      }
    };

    render( ) {
      if ( Firebase.getUser() ) {
        return ( <Navigator initialRoute={{
          name: 'root',
          title: 'My Initial Scene',
          index: 0
        }} renderScene={this.renderScene} configureScene={this.configureScene}/> );
      }

      else {
        return ( <Navigator initialRoute={{
          name: 'login',
          title: 'My Initial Scene',
          index: 0
        }} renderScene={this.renderScene} configureScene={this.configureScene}/> );
    }
  }
}

AppRegistry.registerComponent( 'Seabird', ( ) => Seabird );
