import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  ListView,
  Animated,
  AsyncStorage,
  ScrollView,
  PixelRatio
} from 'react-native';

import { Tile } from './../components/tile';
import { NavBar } from './../components/navBar';
import { PageList } from './../components/pageList';
import Swiper from 'react-native-swiper';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';

const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
// import Analytics from '../firebase/analytics';
// var Analytics = require('react-native-firebase-analytics');

const SCHOOL_NAME = 'Seabird University'; // used for the title bar (although this will eventually be an image)
const { height, width } = Dimensions.get('window');
export default class Root extends Component {

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({ name: routeName, transitionType });
  }

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
      homeSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => true,
      }).cloneWithRows([1, 1, 1, 1, 1, 1]),
    };
  }

  componentWillMount() {
    Database.setUserHomeOrder(JSON.stringify(this.props.HOME_PORTALS));
  }

  renderNavigationDots = (index) =>  {
    return (
    <View style={{ height: 200, width: 200, backgroundColor: 'black' }} />
  )
  };

  render() {
    let moduleList = [];
    const views = [];
    for (let i = 0; i < (this.props.HOME_PORTALS.length / 6); i++) {
      if (i + 1 > this.props.HOME_PORTALS.length / 6) {
        for (let j = 0; j < this.props.HOME_PORTALS.length - (6 * i); j++) {
          moduleList[j] = this.props.HOME_PORTALS[this.props.HOME_PORTALS.length - (6 * i - (i)) + j];
        }
      } else {
        for (let j = 0; j < 6; j++) {
          moduleList[j] = this.props.HOME_PORTALS[(6 * i) + j];
        }
      }

      views.push(
        /* Populating each page of the home view */
        <View key={i} style={{ width, height }}>
          <PageList modules={moduleList} containerStyle={styles.grid} navigator={this.props.navigator} />
        </View>,
      );
      moduleList = [];
    }

    return (
      <Image source={require( '../Icons/Login/gradient_background.png' )} style={styles.gradientBackground}>
        <View style={styles.mainHeader}>
          <NavBar navigator={this.props.navigator} schoolTitle="Seabird University" rightButton="True" />
        </View>
          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDot} />}
            paginationStyle={styles.pagination}
            loop={false}>
            {views}
          </Swiper>
      </Image>
    );
  }
}

const styles = StyleSheet.create({

  /* Style for the navigation dots */
  dot: {
    backgroundColor: 'rgba(10,10,10,.2)',
    width: 5,
    height: 5,
    borderRadius: 4,
    margin: 3,
  },

  /* Style for the navigation dots while activated */
  activeDot: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },

  /* Style for the page pagination */
  pagination: {
    bottom: 70,
    left: 0,
    right: 0
  },

  /* Style for main background image. */
  gradientBackground: {
    height: height,
    width: width,
    resizeMode: 'stretch',
    flexDirection: 'column',
    alignItems: 'center',
  },

  /* Style for the header section that holds the school name and crest */
  mainHeader: {
    width,
    height: 60,
    marginBottom: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  /* Style for the school title text */
  schoolTitle: {
    fontSize: 23,
    fontFamily: 'System',
    fontWeight: '300',
    color: '#000',
    letterSpacing: -0.56,
  },

  /* Style for the tiles for the home screen */
  tile: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: width / 2.4,
    height: height / 4.2,
    paddingBottom: 20,
    margin: width / 25,
    borderRadius: 10,
  },

  /* Style for the tiles' text for the home screen */
  tileText: {
    top: 40,
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '400',
    textAlign: 'center',
    color: '#065539',
  },

  /* Styles the grid format of the list view */
  grid: {
    paddingLeft: width / 20,
    paddingRight: width / 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    height: height * 1.2,
  },

});

AppRegistry.registerComponent('Root', () => Root);
