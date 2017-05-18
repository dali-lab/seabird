/*
 * mainView - Main View of the application
 * The user will land on this page after they choose those user type
 * DALI Lab - Seabird Apps
 * 1/15/17
 */
import React, { Component } from 'react';
import {
  Header,
  nativeHistory,
  Route,
  Router,
  StackRoute,
  withRouter,
  AsyncStorage,
} from 'react-router-native';
import { Navigator, AppRegistry } from 'react-native';
import Firebase from './firebase/firebase';
import Database from './firebase/database';

import Login from './screens/login';
import Root from './screens/root';
import Dining from './screens/dining';
import Events from './screens/events';
import Settings from './screens/settings';
import More from './screens/more';
import Customize from './screens/customize';
import Schedule from './screens/schedule';
import Tutorial from './screens/tutorial';
import Map from './screens/map';
import EventDetail from './screens/eventdetail';
import ComboKeeper from './screens/combokeeper';
import BuildingHours from './screens/buildingHours';
import Emergency from './screens/emergency';
import Food from './screens/food';
import Signup from './screens/signup';
import ModuleDetails from './screens/moduleDetail';
import AppWebView from './screens/appWebView';
import UserType from './screens/userType';
import SplitListView from './screens/splitListView';

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

    userIsSignedIn = () => {
        console.log('USER IS ALREADY SIGNED IN');
        console.log(Firebase.getUser());
        console.log(alreadyLogin)
    };

    componentWillMount() {
        // check if a current user is logged in already
        // Firebase.isUserSignedIn(this.userIsSignedIn);
    }

    constructor( props ) {
      super( props );
      Firebase.initialize( );
      this.updateViewName = this.updateViewName.bind(this);
      this.updateViewURL = this.updateViewURL.bind(this);
      this.passEvent = this.passEvent.bind(this);
      this.updateHome = this.updateHome.bind(this);
      this.orderChanged = this.orderChanged.bind(this);
      this.state = {
        alreadyLogin: false,
        viewName: '',
        URLName: '',
        currentEvent: '',
        HOME_PORTALS: [
          {
            txtName: 'Dining',
            navName: 'dining',
            imgName:  require('./Icons/dining.png'),
          }, {
            txtName: 'Events',
            navName: 'events',
            imgName: require('./Icons/calendar.png'),
          }, {
            txtName: 'WebView',
            navName: 'web',
            imgName: require('./Icons/web.png'),
          }, {
            txtName: 'Campus Map',
            navName: 'map',
            imgName: require('./Icons/map.png'),
          }, {
            txtName: 'Schedule',
            navName: 'schedule',
            imgName: require('./Icons/schedule-01.png'),
          }, {
            txtName: 'WebView',
            navName: 'web',
            imgName: require('./Icons/web.png'),
          }, {
            txtName: 'Green Print',
            navName: 'tutorial',
            imgName: require('./Icons/printer.png'),
          }, {
            txtName: 'Food',
            navName: 'food',
            imgName: require('./Icons/dining.png'),
          }, {
            txtName: 'Combo Keeper',
            navName: 'combokeeper',
            imgName: require('./Icons/combokeeper.png'),
          }, {
            txtName: 'Building Hours',
            navName: 'buildingHours',
            imgName: require('./Icons/buildinghours.png'),
          }, {
            txtName: 'Academics',
            navName: 'academics',
            imgName: require('./Icons/academics.png'),
          }, {
            txtName: 'Emergency',
            navName: 'emergency',
            imgName: require('./Icons/emergency.png'),
          }, {
            txtName: 'Sports',
            navName: 'sports',
            imgName: require('./Icons/emergency.png'),
          }
        ],
      }
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

    updateViewURL(name) {
      this.setState({ URLName: name })
    }

    passEvent(userEvent) {
      this.setState({ currentEvent: userEvent})
    }

    updateHome(newOrder) {
      let newHomeOrder = JSON.parse(newOrder);
      this.setState({ HOME_PORTALS: newHomeOrder })
    }

    orderChanged(newOrder) {
      /* Changes the home page order */
      this.setState({ HOME_PORTALS: newOrder });
      Database.setUserHomeOrder(JSON.stringify(newOrder));
    }
    /* Switch cases */

    renderScene = ( route, navigator ) => {
      switch(route.name) {

          case 'login':
            return (<Login navigator={navigator}
              updateHome={this.updateHome}/>);
              break;

          case 'root':
              return <Root navigator={navigator} HOME_PORTALS={this.state.HOME_PORTALS}
                  updateHome={this.updateHome}/>;
                  break;

          case 'dining':
              return <Dining navigator={navigator}/>;
              break;

          case 'web':
              return <Map navigator={navigator}/>;
              break;

          case 'events':
            return <Events navigator={navigator}
            passEvent={this.passEvent}/>;
            break;

          case 'eventsdetails':
              return (<EventDetail navigator={navigator}
                  currentEvent={this.state.currentEvent}/>);
                  break;

          case 'eventscalendar':
              return <EventDetail navigator={navigator}
                  currentEvent={this.state.currentEvent}/>;
                  break;

          case 'settings':
              return <Settings navigator={navigator}/>;
              break;

          case 'more':
              return <More navigator={navigator}/>;
              break;

          case 'customize':
              return <Customize navigator={navigator} orderChanged={this.orderChanged} HOME_PORTALS={this.state.HOME_PORTALS}/>;
              break;

          case 'schedule':
              return <Schedule navigator={navigator}/>;
              break;

          case 'tutorial':
              return <Tutorial navigator={navigator}/>;
              break;

          case 'map':
              return <Map navigator={navigator}/>;
              break;

          case 'eventdetail':
              return <EventDetail navigator={navigator}/>;
              break;

          case 'combokeeper':
              return <ComboKeeper navigator={navigator}/>;
              break;

          case 'buildingHours':
              return <BuildingHours navigator={navigator}/>;
              break;

          case 'food':
              return <Food navigator={navigator}/>;
              break;

          case 'signup':
              return <Signup navigator={navigator}/>;
              break;

          case 'academics':
              return <ModuleDetails navigator={navigator}
                  viewName={this.state.viewName}
                  updateViewName={this.updateViewName}
                  updateViewURL={this.updateViewURL}/>;
                  break;

          case 'emergency':
              return <Emergency navigator={navigator}/>;
              break;

          case 'appwebview':
              return <AppWebView navigator={navigator}
                  url={this.state.URLName}
                  viewName={this.state.viewName}
                  updateViewName={this.updateViewName}
                  updateViewURL={this.updateViewURL}/>;

          case 'sports':
              return <SplitListView navigator={navigator}
                viewName={this.state.viewName}
                updateViewName={this.updateViewName}
                updateViewURL={this.updateViewURL}/>;
                break;

          case 'userType':
              return <UserType navigator={navigator}/>;
              break;
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
      if (alreadyLogin) {
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
