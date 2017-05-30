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
const NAVBAR_TEXT = 'Events';

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

export default class Events extends Component {

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
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      })
    };
  }

  componentWillMount() {
    Database.listenEvents((value) => {
      console.log(value);
      var tempDataBlob = {};
      var start = 0
      var end = 0
      for (var i = 0; i < value.length; i++) {
        var date = new Date(value[i].day).toDateString();
        if (!tempDataBlob[date]) {
          tempDataBlob[date] = []
        }
        tempDataBlob[date].push(value[i])
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(tempDataBlob),
      })
    })
  }

  navigate(routeName, transitionType = 'up') {
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

  // Search function called when user searches for events
  searchModules = (text) => {
    let searchKey = text;
    if (searchKey.length > 0) {
      var updateListOrder = []
      for (var i = 0; i < this.state.dataSource.sectionIdentities.length; i++) {
        for (var j = 0; j < this.state.dataSource._dataBlob[this.state.dataSource.sectionIdentities[i]].length; j++) {
            if (this.state.dataSource._dataBlob[this.state.dataSource.sectionIdentities[i]][j].event.substring(0, searchKey.length).toUpperCase() === searchKey.toUpperCase()) {
              updateListOrder.push(this.state.dataSource._dataBlob[this.state.dataSource.sectionIdentities[i]][j])
            }
        }
      }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(updateListOrder)
        })

    } else if (searchKey === '') {
      Database.listenEvents((value) => {
        var tempDataBlob = {};
        var start = 0
        var end = 0
        console.log('value length: ' + value.length);
        for (var i = 0; i < value.length; i++) {
          var date = new Date(value[i].day).toDateString();
          if (!tempDataBlob[date]) {
            tempDataBlob[date] = []
          }
          tempDataBlob[date].push(value[i])
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(tempDataBlob),
        })
      })
    }
  };

  // Form dates to distinguish from events
  renderRow = (rowData, sectionID, rowID) => {
    return (
      <TouchableHighlight key={rowData.key} underlayColor="transparent" onPress={() => this.navigatePush('eventsdetails', rowData)} style={{borderBottomWidth: 1, borderBottomColor: "#f2f2f2"}}>
      <View style={styles.listSection}>
      <View style={styles.listSectionTime}>
        <Text style={styles.listSectionTimeText}>{Moment(rowData.startTime).format('h:mm a')}</Text>
      </View>
      <View style={styles.listSectionInfo}>
        <Text style={styles.listSectionTitle}>{rowData.event}</Text>
        <Text style={styles.listSectionText}>{rowData.location}</Text>
      </View>
      </View>
      </TouchableHighlight>
    )
  };

  renderSectionHeader = (sectionData, sectionID) => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>{sectionID}</Text>
      </View>
    )
  };

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
        <View style={styles.sectionHeader}>
        <SearchBar
          placeholder="Search Modules"
          searchSectionStyle={styles.searchSection}
          searchInputStyle={styles.searchSectionInput}
          searchButtonStyle={styles.searchSectionButton}
          searchIconStyle={styles.searchIcon}
          onTextChangeAction={this.searchModule}
          onChangeText={(text) => {
            this.setState({ searchText: text });
            this.searchModules(text);
          }}/>
          <SortSwitch firstOption="All" secondOption="Favorites"/>
        <TouchableHighlight underlayColor="rgb(160, 208, 181)" onPress={() => this.navigate('filterevents')} style={styles.filterButton}>
          <Text style={styles.filterButtonText}>FILTER EVENTS</Text>
        </TouchableHighlight>
        </View>
        <View style={styles.mainContent}>
          <ListView
            dataSource={this.state.dataSource}
            renderSectionHeader={this.renderSectionHeader}
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
  /* Style for the section that will hold the sorting function */
  sectionHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 185,
    backgroundColor: 'rgb(191, 222, 205)',
  },

  /* Style for the section that holds the search bar */
  searchSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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
    width: 10,
    height: 10,
    alignSelf: 'center',
    marginTop: -10,
    paddingRight: 20,
  },

  /* Style for the search button's icon */
  searchIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
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

  pageContent: {
    flex: 1,
    backgroundColor: 'white',
  },

  /* Style for the main section that will hold all the of the content */
  mainContent: {
    backgroundColor: 'white',
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

  /* Style for the school title text */
  schoolTitle: {
    fontSize: 23,
    fontFamily: 'System',
    fontWeight: '300',
    color: '#000',
    letterSpacing: -0.56,
  },

  /* Style for the entire list view */
  listStyle: {
    backgroundColor: '#fff',
  },

  /* Styles for the list headers above the events */
  listHeader: {
    paddingTop: 5,
    paddingLeft: 5,
    height: height / 18,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
  },

  /* Style for the list headers' text */
  listHeaderText: {
    fontFamily: 'Lato',
    fontSize: 14,
    textAlign: 'center',
    paddingLeft: 10,
  },

  /* Style for the list section */
  listSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingLeft: 10,
  },

  /* Style for the list section time */
  listSectionTime: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 5,
  },

  /* Style for the list section time's text */
  listSectionTimeText: {
    width: width / 5,
    fontSize: 14,
    color: '#5D5D5C',
    fontWeight: '400',
    fontFamily: 'Lato'
  },

  /* Style for the list section information */
  listSectionInfo: {
    flexDirection: 'column',
  },

  /* Style for the list section title */
  listSectionTitle: {
    width: width / 1.35,
    fontFamily: 'Avenir',
    fontSize: 18,
    height: 25,
    marginTop: 9,
    color: '#5D5D5C',
  },

  /* Style for the list section text */
  listSectionText: {
    width: width / 1.35,
    fontFamily: 'Lato',
    fontSize: 12,
    height: 20,
    color: 'rgba(93, 93, 92, 0.7)',
    fontStyle: 'italic',
  },

  /* Basic flex for options - around */
  basicFlexAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

AppRegistry.registerComponent('Events', () => Events);
