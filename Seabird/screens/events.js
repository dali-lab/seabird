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
import {CustomizeList} from './../components/customizeList';
import EventItem from './../components/eventItem';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';
import Moment from 'moment'

const { height, width } = Dimensions.get('window');
const NAVBAR_TEXT = 'Events';

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

// reading xml
const xmlURL = "https://spreadsheets.google.com/feeds/list/1W1CvcU9EllQs-DBo4KFz5HM_a67svd1Xj_3CxiZCVIA/1/public/values";
var DOMParser = require('xmldom').DOMParser;
const parser = new DOMParser();
const xmlDoc = null;
var request = new XMLHttpRequest();
var responseXML = '';
request.onreadystatechange = (e) => {
  if (request.readyState !== 4) {
    return;
  }
  if (request.status === 200) {
    responseXML = request.responseText;
    xmlDoc = parser.parseFromString(responseXML);
  } else {
    console.warn('error');
  }
};
request.open('GET', xmlURL);
request.send();

export default class Events extends Component {

  constructor(props) {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        '...and some more....',
        "here is some more",
        "other data is passed",
      ]),
    };
  }

  componentWillMount() {
    Database.listenEvents((value) => {
      this.setState({ dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(value) })
    })
  }

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({name: routeName, transitionType: transitionType,})
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
      <TouchableHighlight underlayColor="transparent" onPress={() => this.navigatePush('eventsdetails', rowData)}>
      <View style={styles.listSection}>
      <View style={styles.listSectionTime}>
        <Text style={styles.listSectionTimeText}>{Moment(rowData.startTime).format('h:mm A')}</Text>
      </View>
      <View style={styles.listSectionInfo}>
        <Text style={styles.listSectionTitle}>{rowData.event}</Text>
        <Text style={styles.listSectionText}>{rowData.details}</Text>
      </View>
      </View>
      </TouchableHighlight>
    )
  };

  renderHeader = (rowData, sectionID, rowID) => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>Header for this section</Text>
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
            renderHeader={this.renderHeader}
            renderRow={this.renderRow}
            style={styles.listStyle}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
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
    height: 60,
    backgroundColor: '#ccc',
    paddingLeft: 10,
  },

  /* Style for the list section time */
  listSectionTime: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 10,
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
    fontFamily: 'Avenir',
    fontSize: 18,
  },

  /* Style for the list section text */
  listSectionText: {
    fontFamily: 'Avenir Next',
    fontSize: 16,
  },
});

AppRegistry.registerComponent('Events', () => Events);
