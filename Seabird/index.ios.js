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
import {
    Navigator, AppRegistry, Image, ActivityIndicator, Dimensions
} from 'react-native';
import Firebase from './firebase/firebase';
import Database from './firebase/database';
import Login from './screens/login';
import Root from './screens/root';
import Dining from './screens/dining';
import Events from './screens/events';
import FilterEvents from './screens/filterEvents';
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
import Loading from './screens/loading'
import Edit from './screens/editProfile'
import Change from './screens/changePassword'
import Web from './screens/web';

require("firebase/auth");
require("firebase/database");

const { height, width } = Dimensions.get('window');
const firebase = require("firebase/app");

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

    componentWillMount() {
        Firebase.isUserSignedIn(this.userIsSignedIn);
    }

    userIsSignedIn = (flag) => {
        if (flag) {
            this.setState({loggedIn: true})
        }
        this.setState({ checkedFirebase: true });
    };

    constructor( props ) {
      super( props );
      Firebase.initialize( );
      this.updateUserType = this.updateUserType.bind(this);
      this.updateActionList = this.updateActionList.bind(this);
      this.updateViewName = this.updateViewName.bind(this);
      this.updateViewURL = this.updateViewURL.bind(this);
      this.passEvent = this.passEvent.bind(this);
      this.updateHome = this.updateHome.bind(this);
      this.orderChanged = this.orderChanged.bind(this);
      this.state = {
        checkedFirebase: false,
        loggedIn: false,
        userType: '',
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
          // }, {
          //   txtName: 'WebView',
          //   navName: 'web',
          //   imgName: require('./Icons/web.png'),
          }, {
            txtName: 'Campus Map',
            navName: 'map',
            imgName: require('./Icons/map.png'),
          }, {
            txtName: 'Schedule',
            navName: 'schedule',
            imgName: require('./Icons/schedule-01.png'),
          // }, {
          //   txtName: 'WebView',
          //   navName: 'web',
          //   imgName: require('./Icons/web.png'),
          // }, {
          //   txtName: 'Green Print',
          //   navName: 'tutorial',
          //   imgName: require('./Icons/printer.png'),
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
            imgName: require('./Icons/sports_1.png'),
          }
        ],
      }
    }

    updateUserType(user) {
        this.setState({userType: user});
    }

    updateActionList(info) {
      let newInfo = JSON.parse(info);
      this.setState({ actionListItems: newInfo })
    }

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

          case 'loading':
              return (<Loading navigator={navigator}/>);
              break;

          case 'login':
            return (<Login navigator={navigator}
              updateHome={this.updateHome}/>);
              break;

          case 'change':
              return (<Change navigator={navigator}/>);
              break;

          case 'root':
              return <Root navigator={navigator}
                           HOME_PORTALS={this.state.HOME_PORTALS}
                           updateHome={this.updateHome}/>;
                  break;

          case 'dining':
              return <Dining navigator={navigator}/>;
              break;

          case 'web':
              return <Web navigator={navigator}/>;
              break;

          case 'events':
            return <Events navigator={navigator}
            passEvent={this.passEvent}/>;
            break;

          case 'filterevents':
            return <FilterEvents navigator={navigator}/>;
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

          case 'edit':
              return <Edit navigator={navigator}/>;
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
              return <Signup
                  navigator={navigator}
                  userType={this.state.userType}
                  updateHome={this.updateHome}/>;
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
              return <UserType
                  navigator={navigator}
                  updateUserType={this.updateUserType}/>;
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
        if (this.state.checkedFirebase === false) {
            return (
                <Image
                    source={require('./Icons/Login/gradient_background.png')}
                    style={{
                        height,
                        width,
                        resizeMode: 'stretch',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <ActivityIndicator
                        style={{
                            height: height,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 8,
                        }}
                        size="large"
                        color="white"
                    />
                </Image>
            );
        }
        else {
            if (this.state.loggedIn === true) {
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
}

AppRegistry.registerComponent( 'Seabird', ( ) => Seabird );
