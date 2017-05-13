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
      if ( route.name === 'login' ) {
        return <Login navigator={navigator}
        updateHome={this.updateHome}/>;
      }

      if ( route.name === 'root' ) {
        return <Root navigator={navigator} HOME_PORTALS={this.state.HOME_PORTALS}
        updateHome={this.updateHome}/>;
      }

      if ( route.name === 'dining' ) {
        return <Dining navigator={navigator}/>;
      }

      if ( route.name === 'web' ) {
        return <Map navigator={navigator}/>;
      }

      if ( route.name === 'events' ) {
        return <Events navigator={navigator}
        passEvent={this.passEvent}/>;
      }

      if ( route.name === 'eventsdetails') {
        return <EventDetail navigator={navigator}
        currentEvent={this.state.currentEvent}/>;
      }

      if ( route.name === 'eventscalendar' ) {
        return <EventsCalendar navigator={navigator}/>;
      }

      if ( route.name === 'settings' ) {
        return <Settings navigator={navigator}/>;
      }

      if ( route.name === 'more' ) {
        return <More navigator={navigator}/>;
      }

      if ( route.name === 'customize' ) {
        return <Customize navigator={navigator} orderChanged={this.orderChanged} HOME_PORTALS={this.state.HOME_PORTALS}/>;
      }

      if ( route.name === 'schedule' ) {
        return <Schedule navigator={navigator}/>;
      }

      if ( route.name === 'tutorial' ) {
        return <Tutorial navigator={navigator}/>;
      }

      if ( route.name === 'map' ) {
        return <Map navigator={navigator}/>;
      }

      if ( route.name === 'eventdetail' ) {
        return <EventDetail navigator={navigator}/>;
      }

      if ( route.name === 'combokeeper' ) {
        return <ComboKeeper navigator={navigator}/>;
      }

      if ( route.name === 'buildingHours' ) {
        return <BuildingHours navigator={navigator}/>;
      }

      if ( route.name === 'dining' ) {
        return <Dining navigator={navigator}/>;
      }

      if ( route.name === 'food' ) {
        return <Food navigator={navigator}/>;
      }

      if ( route.name === 'signup' ) {
        return <Signup navigator={navigator}/>
      }

      if ( route.name === 'academics' ) {
        return <ModuleDetails navigator={navigator}
        viewName={this.state.viewName}
        updateViewName={this.updateViewName}/>
      }

      if ( route.name === 'banner' ) {
        return <AppWebView navigator={navigator}
        viewName={this.state.viewName}
        updateViewName={this.updateViewName}/>
      }

      if ( route.name === 'canvas' ) {
        return <AppWebView navigator={navigator}
        viewName={this.state.viewName}
        updateViewName={this.updateViewName}/>
      }

      if ( route.name === 'timetable' ) {
        return <AppWebView navigator={navigator}
        viewName={this.state.viewName}
        updateViewName={this.updateViewName}/>
      }
    };

    configureScene = ( route, routeStack ) => {
      if ( route.transitionType === 'up' ) {
        return NoBackSwipeUp;
      }
      if ( route.transitionType === 'down' ) {
        return NoBackSwipeDown;
      }
      if ( route.transitionType === 'floatRight' ) {
        return NoBackSwipeFloatRight;
      }
      if ( route.transitionType === 'floatLeft') {
        return NoBackSwipeFloatLeft;
      }
      if ( route.transitionType === 'left') {
        return NoBackSwipePushLeft;
      }
      return NoBackSwipePushRight;
    };

    render( ) {
      Firebase.isUserSignedIn(this.userIsSignedIn)
      if ( alreadyLogin ) {
        return ( <Navigator initialRoute={{
          name: 'root',
          title: 'My Initial Scene',
          index: 0
        }} renderScene={this.renderScene} configureScene={this.configureScene}/> );
      }

      else {
      return ( <Navigator initialRoute={{
        name: 'signup',
        title: 'My Initial Scene',
        index: 0
      }} renderScene={this.renderScene} configureScene={this.configureScene}/> );
    }
  }
}

AppRegistry.registerComponent( 'Seabird', ( ) => Seabird );
