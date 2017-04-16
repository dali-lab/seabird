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

var diningLocations = []
const NAVBAR_TEXT = 'Dining';
const {height, width} = Dimensions.get('window');
var receivedJSON = []

export default class Dining extends Component {

  constructor(props) {
    super(props);
    var locations = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      bounceValue: new Animated.Value(0),
      locationSource: locations.cloneWithRows(diningLocations),
    }
  };


  componentDidMount() {
      apiGetDiningHours('buffer')
      .then((result) => {
        this.setState({
          locationSource: this.state.locationSource.cloneWithRows(result),
        });
         return result
       }).done();
    }

  renderRow = (rowData, sectionID, rowID) => {
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
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
          <View style={styles.contentHeader}>
            <Image
              source={require('./Icons/breakfast-dark.png')}
              style={styles.imageContainer}>
              <Text style={styles.mealIntro}>Current swipe:</Text>
              <Text style={styles.currentSwipe}>BREAKFAST</Text>
              <Text style={styles.currentSwipeSub}>$5.25</Text>
            </Image>
          </View>
          <View style={styles.infoLabels}>
            <Text style={{fontSize: 20, fontWeight: '400', height: 30}}>HOURS</Text>
            <Text style={{fontSize: 20, fontWeight: '400', height: 30}}>LOCATIONS</Text>
          </View>
          <View style={styles.contentInformation}>
            <ListView
              dataSource={this.state.locationSource}
              renderRow={this.renderRow}
              contentContainerStyle={styles.grid}
              enableEmptySections={true}>
            </ListView>
            <TouchableHighlight style={styles.CTA}>
              <Text style={styles.menuOptions}>full menus</Text>
            </TouchableHighlight>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  /* Style for the enter page */
  pageContent: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },

  /* Styles the back button */
  backIcon: {
    flex: 0,
    height: 20,
    resizeMode: 'center',
  },

  /* Style for the section that holds the swipe headers */
  contentHeader: {
    width: 325,
    height: 125,
    marginTop: (height / 27),
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
    fontSize: 26,
    fontFamily: 'System',
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },

  /* Style for the current meal swipe sub text */
  currentSwipeSub: {
    fontSize: 26,
    fontFamily: 'System',
    fontWeight: '400',
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

  /* Style for te content information */
  contentInformation: {
    width: width,
    flexDirection: 'column',
    alignItems:'center',
    height: height / 3,
    marginTop: 30,
  },

  /* Style for the view that will hold the labels */
  infoLabels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 50,
    height: 30,
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

AppRegistry.registerComponent('Dining', () => Dining);
