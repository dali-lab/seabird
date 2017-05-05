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
} from 'react-native';

import { Tile } from './../components/tile';
import { ActionList } from './../components/actionList';
import { NavBar } from './../components/navBar';

const COLOR1 = '#000'; // used for 3/6 buttons and the Next button (NOTE: original color)
const COLOR2 = '#01964d'; // used for the other 3/6 buttons (although this will eventually be an image)
const { height, width } = Dimensions.get('window');
import SortableGrid from 'react-native-sortable-grid';

export default class BuildingHours extends Component {

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({ name: routeName, transitionType });
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid,
    });
    this.state = {
      bounceValue: new Animated.Value(0),
      items: [],
      itemsSource: ds.cloneWithRows([]),
    };
  }

  // TODO: consider using ScrollView instead to load all home tiles at beginning
  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          backgroundColor: '#fff',
        }}
      >
        <NavBar navigator={this.props.navigator} text="Testing" />
        <ActionList />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  /* Style for the school title text */
  schoolTitle: {
    fontSize: 23,
    fontFamily: 'System',
    fontWeight: '300',
    color: '#000',
    letterSpacing: -0.56,
  },

  /* Style for three of the main home screen tile buttons */
  tile1: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 2.1,
    height: height / 4,
    paddingBottom: 20,
    margin: 2,
    backgroundColor: COLOR1,
  },

  /* Style for the other three of the main home screen tile buttons */
  tile2: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 2.1,
    height: height / 4,
    margin: 2,
    backgroundColor: COLOR2,
  },

  /* Style for the smaller tiles on the home screen */
  tile3: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 3.18,
    height: height / 6,
    margin: 2,
    backgroundColor: COLOR1,
  },

  /* Style for the main label texts on the main buttons */
  tileText1: {
    top: 40,
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
  },

  /* Style for the main label texts on the main buttons */
  tileText2: {
    top: 15,
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
  },

  /* Styles the grid format of the list view */
  grid: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    height: height * 1.1,
  },

  /* Style for the bottom button that moves to the next page */
  nextButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
    marginTop: 15,
    backgroundColor: COLOR1,
  },

  /* Style for the icons on the main buttons */
  mainIcon: {
    top: 10,
  },

  /* Style for the settings icon up in the top bar */
  settingsIcon: {
    flex: 0,
    height: 30,
    resizeMode: 'contain',
  },

  /* Styles the more options down button */
  downIcon: {
    flex: 1,
    height: 10,
    resizeMode: 'center',
  },
});

AppRegistry.registerComponent('BuildingHours', () => BuildingHours);
