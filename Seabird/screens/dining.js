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
} from 'react-native';
import { NavBar } from './../components/navBar';
import { queryDB } from './../api';
import { saveToDB } from './../api';
import { SearchBar } from './../components/searchBar';
import { SortSwitch } from './../components/sortSwitch';
import { ButtonSwitches } from './../components/buttonSwitches';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';

const { height, width } = Dimensions.get('window');
const NAVBAR_TEXT = 'Dining';

let diningLocations = [];
let currentHour = new Date().getHours();

export default class Dining extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
      locationSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
      constDataSource: [],
    };
    queryDB("age")
  };

  componentWillMount() {
    Database.listenContentDining('dining', (value) => {
      this.setState({ constDataSource: value, locationSource: this.state.locationSource.cloneWithRows(value),
      })
    })
  }

  // Search function called when user searches for events
  searchModules = (text) => {
    var searchKey = text
    if (searchKey.length > 0) {
      var updateList = []
      for (var i = 0; i < this.state.constDataSource.length; i++) {
        if (this.state.constDataSource[i].title.substring(0, searchKey.length).toUpperCase() === searchKey.toUpperCase()) {
          updateList.push(this.state.constDataSource[i])
        }
      }
        this.setState({ locationSource: this.state.locationSource.cloneWithRows(updateList) })

    } else if (searchKey === '') {
      this.setState({ locationSource: this.state.locationSource.cloneWithRows(this.state.constDataSource) })
    }
  };

  renderRow = (rowData) => {
    if (7 <= currentHour && currentHour < 11) {
      return (
        <TouchableHighlight underlayColor='#ddd' style={{height: 120}}>
          <View style={styles.section}>
            <View style={styles.locationTextSection}>
            <Text style={styles.title}>{rowData.title}</Text>
            <Text style={styles.location}>{rowData.location}</Text>
            <Text style={styles.time}>{rowData.time}</Text>
            </View>
            <View style={styles.locationImageSection}>
              <Image source={require('./../Icons/breakfast-dark.png')} style={styles.locationImage} />
            </View>
          </View>
        </TouchableHighlight>
      )
    } else if (11 <= currentHour && currentHour < 16) {
      return (
        <TouchableHighlight underlayColor='#ddd' style={{height: 120}}>
          <View style={styles.section}>
            <View style={styles.locationTextSection}>
            <Text style={styles.title}>{rowData.title}</Text>
            <Text style={styles.location}>{rowData.location}</Text>
            <Text style={styles.time}>{rowData.time}</Text>
            </View>
            <View style={styles.locationImageSection}>
              <Image source={require('./../Icons/lunch.jpg')} style={styles.locationImage} />
            </View>
          </View>
        </TouchableHighlight>
      )
    } else if (16 <= currentHour && currentHour < 21) {
      return (
        <TouchableHighlight underlayColor='#ddd' style={{height: 120}}>
          <View style={styles.section}>
            <View style={styles.locationTextSection}>
            <Text style={styles.title}>{rowData.title}</Text>
            <Text style={styles.location}>{rowData.location}</Text>
            <Text style={styles.time}>{rowData.time}</Text>
            </View>
            <View style={styles.locationImageSection}>
              <Image source={require('./../Icons/dinner.jpg')} style={styles.locationImage}/>
            </View>
          </View>
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableHighlight underlayColor='#ddd' style={{height: 120}}>
          <View style={styles.section}>
            <View style={styles.locationTextSection}>
            <Text style={styles.title}>{rowData.title}</Text>
            <Text style={styles.location}>{rowData.location}</Text>
            <Text style={styles.time}>{rowData.time}</Text>
            </View>
            <View style={styles.locationImageSection}>
              <Image source={require('./../Icons/late_night.jpg')} style={styles.locationImage} />
            </View>
          </View>
        </TouchableHighlight>
      )
    }
  };

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
        <View style={styles.sectionHeader}>
        <SearchBar
          placeholder="Search Dining Locations"
          searchSectionStyle={styles.searchSection}
          searchInputStyle={styles.searchSectionInput}
          searchButtonStyle={styles.searchSectionButton}
          searchIconStyle={styles.searchIcon}
          onTextChangeAction={this.searchModule}
          onChangeText={(text) => {
            this.setState({ searchText: text });
            this.searchModules(text);
          }}/>
          <View style={styles.basicFlexAround}>
            <ButtonSwitches title="SORT" firstOption="Nearest" secondOption="Status"/>
          </View>
        </View>
        <View style={styles.mainContent}>
          <ListView
            dataSource={this.state.locationSource}
            renderRow={this.renderRow}
            style={styles.listStyle}
            enableEmptySections={true}
          />
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

  /* Style for the section that will hold the sorting function */
  sectionHeader: {
    height: 125,
    backgroundColor: '#C6E4C0',

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

  /* Style for the main section that will hold all the of the content */
  mainContent: {
    backgroundColor: 'white',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'column',
    height: height / 1.4,
  },

  /* Style for each section in the list view */
  section: {
    flex: 1,
    height: 120,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  /* Style for the section that holds the location's text */
  locationTextSection: {
    flexDirection: 'column',
    height: 200,
    width: width / 1.5,
    paddingTop: 10,
    paddingLeft: 15,
  },

  /* Style for the section that holds the location's image */
  locationImageSection: {
    height: 200,
  },

  /* Style for the location's title */
  title: {
    fontFamily: 'Lato',
    fontSize: 18,
    fontWeight: '500',
    color: '#46443b',
  },

  /* Style for the location's actual building name */
  location: {
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'italic',
    color: 'rgba(70, 68, 59, 0.9)',
  },

  /* Style for the location's time */
  time: {
    fontSize: 13,
    color: '#888',
    paddingTop: 3,
  },

  /* Style for the location's image */
  locationImage: {
    height: 120,
    width: 125,
    resizeMode: 'cover',
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
