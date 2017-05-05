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
} from 'react-native';

import { Tile } from './../components/tile';
import { NavBar } from './../components/navBar';
import { PageList } from './../components/pageList';
import Carousel from 'react-native-snap-carousel';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';

const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
// import Analytics from '../firebase/analytics';
// var Analytics = require('react-native-firebase-analytics');

const COLOR1 = '#00713A'; // used for 3/6 buttons and the Next button (NOTE: original color)
const COLOR2 = '#01964d'; // used for the other 3/6 buttons
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
    // this.props.updateHome(Database.listenUserHomeOrder());
    // Database.listenUserHomeOrder((value) => {
    //   if (value != '') {
    //     this.props.updateHome(value);
    //     Database.setUserHomeOrder(value);
    //   }
    // });
  }
  // componentWillReceiveProps(nextProps) {
  //   this.partitionModules(nextProps.HOME_PORTALS)
  // }
  //
  // componentWillMount() {
  //   this.partitionModules(this.props.HOME_PORTALS)
  // }
  //
  // partitionModules = (this.props.HOME_PORTALS) => {
  //
  //   }
  //   this.forceUpdate()
  // }


  render() {
    // console.log('re rendering');
    let moduleList = [];
    const views = [];
    for (let i = 0; i < (this.props.HOME_PORTALS.length / 6); i++) {
      if (i + 1 > this.props.HOME_PORTALS.length / 6) {
        for (var j = 0; j < this.props.HOME_PORTALS.length - (6 * i); j++) {
          moduleList[j] = this.props.HOME_PORTALS[this.props.HOME_PORTALS.length - (6 * i - (i + 1)) + j];
        }
      } else {
        for (var j = 0; j < 6; j++) {
          moduleList[j] = this.props.HOME_PORTALS[(6 * i) + j];
        }
      }

      views.push(
        <View key={i} style={{ width, height, backgroundColor: '#00713A' }}>
          <PageList modules={moduleList} containerStyle={styles.grid} navigator={this.props.navigator} />
        </View>,
      );
      moduleList = [];
    }

    return (
      <View
        style={{
          alignItems: 'flex-start',
          backgroundColor: '#065539',
        }}
      >

        <View style={styles.mainHeader}>
          <NavBar navigator={this.props.navigator} schoolTitle="Seabird University" rightButton="True" />
        </View>
        <Carousel
          style={styles.scrollview}
          indicatorStyle={'white'}
          itemWidth={width}
          sliderWidth={100}
          scrollEventThrottle={200}
          inactiveSlideScale={1}
          bounces={false}
        >
          {views}
        </Carousel>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the header section that holds the school name and crest */
  mainHeader: {
    width,
    height: 60,
    marginBottom: 2,
    backgroundColor: '#00713A',
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
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    height: height * 1.2,
  },

  /* Style for the bottom button that moves to the next page */
  nextButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
    marginTop: 15,
    backgroundColor: COLOR1,
  },

});

AppRegistry.registerComponent('Root', () => Root);
