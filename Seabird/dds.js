import React, { Component } from 'react';
import { Image, Animated, StyleSheet, LinkingIOS, ScrollView, ListView, View, Text, Navigator, AppRegistry, PropTypes, TouchableHighlight, WebView, Dimensions } from 'react-native';
import { NavBar } from './components/navBar';

const ddsLocations = [
  {location: 'FOCO', hours: '11AM - 3:30PM'},
  {location: 'THE HOP', hours: '11AM - 3:30PM'},
  {location: 'NOVACK', hours: '11AM - 3:30PM'},
  {location: 'COLLIS', hours: '11AM - 3:30PM'}
];
const NAVBAR_TEXT = 'Food';
const {height, width} = Dimensions.get('window');

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

  timesLocations(){
    var dataList = []
    for (var i = 0; i < ddsLocations.length; i++) {
      dataList.push(ddsLocations[i].hours + " " + ddsLocations[i].location);
    }
    return dataList;
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor='#ddd' style={{height: 50}}>
        <View>
          <Text style={styles.listItem} numberOfLines={1}>{rowData}</Text>
          <View style={styles.divider}/>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
        <View style={styles.mainContent}>
          <View style={styles.contentHeader}>
          <Image
            source={require('./Icons/breakfast.jpg')}
            style={styles.imageContainer}>
            <Text style={styles.mealIntro}>The current swipe is</Text>
            <Text style={styles.currentSwipe}>BREAKFAST: $5.25</Text>
            <Text style={styles.menuOptions}>See full menus here</Text>
          </Image>
          </View>
          <View style={styles.contentInformation}>
            <ListView dataSource={this.state.locationSource} renderRow={this.renderRow.bind(this)}>
            </ListView>
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
    flexDirection: 'row',
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
    height: height/2,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Style for the intro phrase */
  mealIntro: {
    fontSize: 18,
    fontFamily: 'System',
    textAlign: 'center',
    color: '#fff',
  },

  /* Style for the current meal swipe */
  currentSwipe: {
    fontSize: 28,
    fontFamily: 'System',
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },

  /* Style for the menu option */
  menuOptions: {
    fontSize: 12,
    fontFamily: 'System',
    textAlign: 'center',
    marginTop: 7,
    color: '#fff',
  },

  contentInformation: {
    width: 250,
  },

  listItem: {
    width: width,
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '400',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },

  /* Style for the divider in the list */
  divider: {
    height: 1,
    backgroundColor: '#bbb',
  },

});

AppRegistry.registerComponent('DDS', () => DDS);
