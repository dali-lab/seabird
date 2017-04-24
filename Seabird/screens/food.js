// NOTE:
// THIS FILE IS BUILT AND USED FOR TESTING BY SEAN
// THINGS IN THIS FILE ARE STILL IN PROGRESS AND MAY BE FOR TESTING PURPOSES ONLY

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

const { height, width } = Dimensions.get('window');
const NAVBAR_TEXT = 'Food';

// info for reading xml file (google sheet)
const xmlURL = "https://spreadsheets.google.com/feeds/list/12cYH8vNOcIla4MNboj-MPinTEERDjJM9dEWWoBnsNtk/1/public/values";
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
    // console.log('success', responseXML);
    // console.log('success2', xmlDoc);
  } else {
    console.warn('error');
  }
};
request.open('GET', xmlURL);
request.send();


export default class Food extends Component {

  constructor(props) {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const numItems = xmlDoc.getElementsByTagName("title").length;
    var dataRows = [];
    for (i = 1; i < numItems; i++) {
      dataRows.push(xmlDoc.getElementsByTagName("title")[i].childNodes[0].data);
    }
    this.state = {
      dataSource: ds.cloneWithRows(dataRows),
    };
  }

  // componentDidMount() {
  //   console.log("Parsed info: ");
  //   console.log(xmlDoc.getElementsByTagName("title"));
  //   AsyncStorage.getItem('tileOrder').then((value) => {
  //     this.setState({tileOrder: value});
  //   }).done();
  // }

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({name: routeName, transitionType: transitionType,})
  }

  navigatePop() {
    this.props.navigator.pop();
  }

  navigatePush(routeName) {
    this.props.navigator.push({
      name: routeName,
    });
  }

  renderRow = (rowData, sectionID, rowID) => {
    /* Form dates to distinguish from events */
    if ((rowData == 'OPEN NOW:') || (rowData == 'CLOSED NOW:')) {
      return(
        <Text style={styles.listHeader}>{rowData}</Text>
      )
    }
    else if (rowData.substring(0,3) == ' **') {
      return(
        <Text style={styles.listItemEmphasized}>{rowData}</Text>
      )
    }
    /* Every event that is not a date */
    else {
      return(
        <Text style={styles.listItem} onPress={this.navigate.bind(this, 'eventdetail', 'normal')}>{rowData}</Text>
      )
    }
  }

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
        <View style={styles.mainContent}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
          <TouchableHighlight style={styles.CTA} onPress={this.navigate.bind(this, 'eventscalendar', 'normal')}>
            <Text style={styles.CTAText}>Calendar View</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

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
  },

  /* Styles for the list headers above the item */
  listHeader: {
    paddingTop: 5,
    paddingLeft: 5,
    height: height / 25,
    backgroundColor: '#d5d5d5',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  /* Styles for the emphasized list item */
  listItemEmphasized: {
    paddingTop: height / 45,
    paddingLeft: 10,
    height: height / 20,
    backgroundColor: 'white',
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#d5d5d5',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  /* Styles for the list item */
  listItem: {
    paddingTop: height / 45,
    paddingLeft: 10,
    height: height / 20,
    backgroundColor: 'white',
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#d5d5d5',
  },
});

AppRegistry.registerComponent('Food', () => Food);
