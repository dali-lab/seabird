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
  Modal,
  ReactPropTypes
} from 'react-native';
import { NavBar } from './components/navBar';
import { apiGetDiningHours } from './api'

var ddsLocations = []
var callCodes = [
  {schoolID: '58bc146e0f30433ec4d0e8f8', view: 'hours', viewID: '58bc146e0f30433ec4d0e8fe'},
  {schoolID: '58bc146e0f30433ec4d0e8f8', view: 'hours', viewID: '58bc146e0f30433ec4d0e905'},
  {schoolID: '58bc146e0f30433ec4d0e8f8', view: 'hours', viewID: '58bc146e0f30433ec4d0e902'},
]
const NAVBAR_TEXT = 'Dining';
const {height, width} = Dimensions.get('window');
var receivedJSON = []

export default class DDS extends Component {

  constructor(props) {
    super(props);
    var locations = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      bounceValue: new Animated.Value(0),
      locationSource: locations.cloneWithRows(ddsLocations),
    }
  };


  componentWillMount() {
    for (i = 0; i < callCodes.length; i++) {
      const result = ['5:00pm - 8:30pm', 'Foco', '7:00am - 8:00pm', 'Collis', '8:00am - 9:00pm', 'Hop', '7:30am - 2:00am', 'Novack', '8:00am - 8:00pm', 'KAF'];
      // apiGetDiningHours(callCodes[i])
      // .then((result) => {
        this.setState({
          locationSource: this.state.locationSource.cloneWithRows(result),
        });
      //   return result
      // }).done();
    }
  }

  renderRow = (rowData, sectionID, rowID) => {
    console.log(rowData);
    return (
      <TouchableHighlight underlayColor='#ddd' style={{height: 50}}>
        <View>
          <Text style={styles.listItem}>{rowData}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
  //console.log(this.state.locationSource)
    return (
      <View style={styles.pageContent}>
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
    flex: 1,
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
    backgroundColor: 'white',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  /* Style for the section that holds the swipe headers */
  contentHeader: {
    width: 325,
    height: 125,
    marginTop: - (height / 8),
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
    textShadowColor: '#000',
    textShadowOffset: {width: 0.1, height: 0.1},
    textShadowRadius: 1,
  },

  /* Style for the menu option */
  menuOptions: {
    fontSize: 16,
    fontFamily: 'System',
    textAlign: 'center',
    marginTop: 12,
    color: '#89E1A9',
  },

  /* Style for te content information */
  contentInformation: {
    width: width,
    flexDirection:'column',
    alignItems:'center',
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

  /* Style for the grid format of the list view */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  /* Style for the list items */
  listItem: {
    width: width / 2,
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '400',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    textAlign: 'center',
    paddingLeft: 15,
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

});

AppRegistry.registerComponent('DDS', () => DDS);
