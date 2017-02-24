import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  ScrollView,
  ListView,
  Animated,
} from 'react-native';
import { NavBar } from './components/navBar';

var ddsLocations = []
var callCodes = [
  {schoolID: '58aa0107e437067dcebb0693', view: 'hours', viewID: '58aa0107e437067dcebb0698'},
  {schoolID: '58aa0107e437067dcebb0693', view: 'hours', viewID: '58aa0107e437067dcebb069d'},
]
const NAVBAR_TEXT = 'Food';
const {height, width} = Dimensions.get('window');
const recievedJSON = []

export default class DDS extends Component {
  // Initialize the hardcoded data

  constructor(props) {
    super(props);
    var locations = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid != r2.guid});
    this.state = {
      bounceValue: new Animated.Value(0),
      locationSource: locations.cloneWithRows(this.timesLocations()),
    }
  };

  GET = (codes) => {
    for (i = 0; i < codes.length; i++) {
      fetch('http://localhost:3000/api/schools/' + codes[i].schoolID + '/' + codes[i].view + '/' + codes[i].viewID)
      .then((response) => response.json())
      .then((responseJson) => {
        receivedJSON = responseJson
          ddsLocations.push(responseJson.times[0].startTime + ' - ' + responseJson.times[0].endTime)
          ddsLocations.push(responseJson.name)
          console.log(responseJson)
        })
      .catch((error =>
        console.error(error)
      ))
    }
  }

  timesLocations(){
    var dataList = []
    for (var i = 0; i < ddsLocations.length; i++) {
      /* Separates the hours and locations to be in their own slots in the array */
      dataList.push(ddsLocations[i])
    }
    return dataList;
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor='#ddd' style={{height: 50}}>
        <View>
          <Text style={styles.listItem}>{rowData}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.pageContent} onPress={this.GET(callCodes) }>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
        <View style={styles.mainContent}>
          <View style={styles.contentHeader}>
          <Image
            source={require('./Icons/breakfast.jpg')}
            style={styles.imageContainer}>
            <Text style={styles.mealIntro}>Current swipe:</Text>
            <Text style={styles.currentSwipe}>BREAKFAST</Text>
            <Text style={styles.currentSwipe}>$5.25</Text>
          </Image>
          </View>
          <View style={styles.infoLabels}>
            <Text>Hours</Text>
            <Text>Locations</Text>
          </View>
          <View style={styles.contentInformation}>
            <ListView
              dataSource={this.state.locationSource}
              renderRow={this.renderRow.bind(this)}
              contentContainerStyle={styles.grid}
              enableEmptySections={true}>
            </ListView>
            <TouchableHighlight style={styles.CTA}>
              <Text style={styles.menuOptions}>full menus</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  /* Style for the enter page */
  pageContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  /* Styles the back button */
  backIcon: {
    flex: 0,
    height: 20,
    resizeMode: 'center',
  },

  /* Style for the main section that will hold all the of the DDS content */
  mainContent: {
    width: width,
    backgroundColor: 'white',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  /* Style for the section that holds the swipe headers */
  contentHeader: {
    width: 325,
    height: 125,
    marginTop: -2,
  },

  /* Style for the image container */
  imageContainer: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{scale: height / 470}]
  },

  /* Style for the intro phrase */
  mealIntro: {
    fontSize: 12,
    fontFamily: 'System',
    textAlign: 'center',
    color: '#fff',
  },

  /* Style for the current meal swipe */
  currentSwipe: {
    fontSize: 22,
    fontFamily: 'System',
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
  },

  /* Style for the menu option */
  menuOptions: {
    fontSize: 16,
    fontFamily: 'System',
    textAlign: 'center',
    marginTop: 12,
    color: '#89E1A9',
  },

  contentInformation: {
    width: width,
    justifyContent: 'center',
    marginTop: 30,
  },

  /* Style for the view that will hold the labels */
  infoLabels: {
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 50,
  },

  /* Styles the grid format of the list view */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  listItem: {
    width: width / 2,
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '400',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    textAlign: 'center',
  },

  /* Style for the Call To Action button */
  CTA: {
    width: width / 2,
    height: 50,
    borderWidth: 2,
    borderColor: '#89E1A9',
    borderRadius: 25,
    marginTop: 50,
  },

});

AppRegistry.registerComponent('DDS', () => DDS);
