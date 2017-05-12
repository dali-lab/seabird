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
  PixelRatio,
  TextInput,
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
      searchText: '',
      bounceValue: new Animated.Value(0),
      HOME_PORTALS: []
    };
  }

  componentWillMount() {
    Database.setUserHomeOrder(JSON.stringify(this.props.HOME_PORTALS));
    this.setState({ HOME_PORTALS: this.props.HOME_PORTALS })
  }

  searchModules = () => {
    var searchKey = this.state.searchText
    if (searchKey.length > 0) {
      var updateHomeOrder = []
      for (var i = 0; i < this.props.HOME_PORTALS.length; i++) {
        if (this.props.HOME_PORTALS[i].txtName === searchKey || this.props.HOME_PORTALS[i].navName === searchKey) {
          updateHomeOrder.push(this.props.HOME_PORTALS[i])
        }
      }
        this.setState({ HOME_PORTALS: updateHomeOrder })
    } else {
      this.setState({ HOME_PORTALS: this.props.HOME_PORTALS })
    }
  }

  renderNavigationDots = (index) =>  {
    return (
    <View style={{ height: 200, width: 200, backgroundColor: 'black' }} />
  )
  };

  render() {
    let moduleList = [];
    const views = [];
    for (let i = 0; i < (this.state.HOME_PORTALS.length / 6); i++) {
      if (i + 1 > this.state.HOME_PORTALS.length / 6) {
        for (let j = 0; j < this.state.HOME_PORTALS.length - (6 * i); j++) {
          moduleList[j] = this.state.HOME_PORTALS[this.state.HOME_PORTALS.length - (6 * i - (i)) + j - 1];
          console.log(this.state.HOME_PORTALS.length + ": " + JSON.stringify(moduleList));
        }
      } else {
        for (let j = 0; j < 6; j++) {
          moduleList[j] = this.state.HOME_PORTALS[(6 * i) + j];
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
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchSectionInput}
            placeholder="Search Modules"
            placeHolderTextColor="white"
            onChangeText={(text) => this.setState({ searchText: text })}
          />
          <TouchableHighlight
            ref="SearchBar"
            underlayColor="transparent"
            style={styles.searchSectionButton}
            onPress={() => this.searchModules()}
          >
            <Text>GO</Text>
          </TouchableHighlight>
        </View>
        <Swiper
          containerCustomStyle={styles.wrapper}
          contentContainerCustomStyle={styles.wrapper}
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

  /* Style for the section that holds the search bar */
  searchSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: width / 1.2,
    height: 40,
    marginTop: 15,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
  },

  /* Style for the search bar */
  searchSectionInput: {
    width: width / 1.6,
    height: 40,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 10,
  },

  /* Style for the search bar button */
  searchSectionButton: {
    width: 40,
    height: 40,
  },

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
    bottom: height / 5.2,
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
    paddingLeft: width / 15,
    paddingRight: width / 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    height: height,
  },

});

AppRegistry.registerComponent('Root', () => Root);
