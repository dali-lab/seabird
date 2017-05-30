import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions,
  TouchableHighlight,
  ListView,
  TextInput,
  Image,
  LayoutAnimation,
} from 'react-native';
import { NavBar } from './../components/navBar';
import { SortSwitch } from './../components/sortSwitch';
import { SearchBar } from './../components/searchBar';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';
import Moment from 'moment'

const { height, width } = Dimensions.get('window');
const NAVBAR_TEXT = 'Filter';

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

// Linear with easing
var CustomLayoutLinear = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.curveEaseInEaseOut,
  },
};

// Spring
var CustomLayoutSpring = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.7,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7,
  },
};

export default class FilterEvents extends Component {

  constructor(props) {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      firstPressStatus: true,
      secondPressStatus: false,
      thirdPressStatus: true,
      fourthPressStatus: false,
      dataBlob: {},
      loaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }).cloneWithRows(['All Events', 'Arts', 'Business', 'Career Center', 'Greek Life', 'Languages', 'Performances', 'Programming Board', 'Religious', 'Service', 'Sports', 'Student Organizations'])
    };
  }

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({ name: routeName, transitionType: transitionType, })
  }

  navigatePop() {
    this.props.navigator.pop();
  }

  navigatePush(routeName, userEvent) {
    this.props.passEvent(userEvent)
    this.props.navigator.push({
      name: routeName,
    });
  }

  // Form dates to distinguish from events
  renderRow = (rowData, sectionID, rowID) => {
    return (
      <TouchableHighlight key={rowData.key} underlayColor="transparent" style={{borderBottomWidth: 1, borderBottomColor: "#f2f2f2"}}>
      <View style={styles.listSection}>
        <Text style={styles.listSectionTitle}>{rowData}</Text>
      </View>
      </TouchableHighlight>
    )
  };

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
        <View style={styles.sectionHeader}>
        <View style={styles.basicFlexAround}>
          <SortSwitch firstOption="Select All" secondOption="Select None"/>
        </View>
        </View>
        <View style={styles.mainContent}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            style={styles.listStyle}
            enableEmptySections={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
    backgroundColor: 'rgb(191, 222, 205)',
  },

  /* Style for the section that will hold the sorting function */
  sectionHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 100,
    backgroundColor: 'rgb(191, 222, 205)',
  },

  /* Style for the filter events button */
  filterButton: {
    width: width / 1.6,
    height: 33,
    borderRadius: 3,
    backgroundColor: 'rgb(146, 193, 167)',
    alignSelf: 'center',
    right: -4,
    marginTop: 14,
  },

  /* Style for the filter events button's text */
  filterButtonText: {
    fontFamily: 'Lato',
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 5,
  },

  /* Style for the main section that will hold all the of the content */
  mainContent: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  /* Style for the header section that holds the school name and crest */
  mainHeader: {
    width: width,
    height: 60,
    marginBottom: 2,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  /* Style for the entire list view */
  listStyle: {
    width: width / 1.1,
    height: height / 1.32,
    alignSelf: 'center',
    backgroundColor: 'rgb(191, 222, 205)',
  },

  /* Style for the list section */
  listSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    height: 45,
    marginBottom: 10,
    paddingLeft: 30,
  },

  /* Style for the list section title */
  listSectionTitle: {
    width: width / 1.35,
    fontFamily: 'Lato',
    fontSize: 18,
    height: 25,
    marginTop: 11,
    fontWeight: '400',
    color: '#5D5D5C',
  },

  /* Basic flex for options - around */
  basicFlexAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -20,
  },
});

AppRegistry.registerComponent('FilterEvents', () => FilterEvents);
