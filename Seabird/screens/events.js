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
} from 'react-native';
import {NavBar} from './../components/navBar';
import EventItem from './../components/eventItem';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';
import Moment from 'moment'

const { height, width } = Dimensions.get('window');
const NAVBAR_TEXT = 'Events';

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

export default class Events extends Component {

  constructor(props) {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataBlob: {},
      loaded: false,
      //dataSource: ds.cloneWithRows([' ',]),
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== r2
      })
    };
  }

  componentWillMount() {
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

  renderRow = (rowData, sectionID, rowID) => {
    /* Form dates to distinguish from events */
    return (
      <TouchableHighlight key={rowData.key} underlayColor="transparent" onPress={() => this.navigatePush('eventsdetails', rowData)}>
      {/*Align items center */}
      <View style={styles.listSection}>
      <View style={styles.listSectionTime}>
        <Text style={styles.listSectionTimeText}>{Moment(rowData.startTime).format('h:mm A')}</Text>
      </View>
      <View style={styles.listSectionInfo}>
        <Text style={styles.listSectionTitle}>{rowData.event}</Text>
        {/*<Text style={styles.listSectionText}>{rowData.details}</Text>*/}
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
        <View style={styles.mainContent}>
          <ListView
            dataSource={this.state.dataSource}
            renderSectionHeader={this.renderSectionHeader}
            renderRow={this.renderRow}
            style={styles.listStyle}

          />
          <TouchableHighlight style={styles.CTA} onPress={this.navigate.bind(this, 'eventscalendar', 'up')}>
            <Text style={styles.CTAText}>Calendar View</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

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

  /* Style for the menu option */
  CTAText: {
    fontSize: 16,
    fontFamily: 'System',
    textAlign: 'center',
    marginTop: 12,
    color: '#89E1A9',
  },

  /* Style for the Call To Action button */
  CTA: {
    width: width / 2,
    height: 50,
    borderWidth: 2,
    borderColor: '#89E1A9',
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
  },

  /* Style for the entire list view */
  listStyle: {
    backgroundColor: '#ccc',
    height: height - 150,
  },

  /* Style for the separator */
  separator: {
    marginLeft: 10,
    height: 1,
    backgroundColor: '#bbb'
  },

  /* Styles for the list headers above the events */
  listHeader: {
    paddingTop: 5,
    paddingLeft: 5,
    height: height / 25,
    backgroundColor: '#d5d5d5',
  },

  /* Style for the list headers' text */
  listHeaderText: {
    fontFamily: 'Avenir',
    fontSize: 14,
  },

  /* Style for the list section */
  listSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 65,
    backgroundColor: '#ccc',
    paddingLeft: 10,
  },

  /* Style for the list section time */
  listSectionTime: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 65,
    marginRight: 5,
  },

  /* Style for the list section time's text */
  listSectionTimeText: {
    width: width / 5,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  },

  /* Style for the list section information */
  listSectionInfo: {
    paddingTop: 10,
    flexDirection: 'column',
  },

  /* Style for the list section title */
  listSectionTitle: {
    width: width / 1.35,
    fontFamily: 'Avenir',
    fontSize: 18,
    height: 65,
    marginTop: 9,
  },

  /* Style for the list section text */
  listSectionText: {
    fontFamily: 'Avenir Next',
    fontSize: 16,
  },
});

AppRegistry.registerComponent('Events', () => Events);
