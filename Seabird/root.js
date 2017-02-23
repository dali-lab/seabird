
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
} from 'react-native';

import { Tile } from './components/tile';

const COLOR1 = '#73D9A4'; // used for 3/6 buttons and the Next button (NOTE: original color)
const COLOR2 = '#4CCE8B'; // used for the other 3/6 buttons
const SCHOOL_NAME = 'Dartmouth College'; // used for the title bar (although this will eventually be an image)
const {height, width} = Dimensions.get('window');

const HOME_PORTALS = [
  {
    'txtName': 'DDS Hours',
    'navName': 'dds',
    'imgName': require('./Icons/Restaurant-50-White.png'),
  },
  {
    'txtName': 'Laundry',
    'navName': null,
    'imgName': require('./Icons/T-Shirt-50-White.png'),
  },
  {
    'txtName': 'News',
    'navName': 'news',
    'imgName': require('./Icons/News-50-White.png'),
  },
  {
    'txtName': 'Campus Map',
    'navName': null,
    'imgName': require('./Icons/Map-Marker-50-White.png'),
  },
  {
    'txtName': 'Schedule',
    'navName': null,
    'imgName': require('./Icons/Calendar-50-White.png'),
  },
  {
    'txtName': 'Sports',
    'navName': 'sports',
    'imgName': require('./Icons/Sport-50-White.png'),
  },
];

export default class Root extends Component {

  navigate(routeName, transitionType='normal') {
    this.props.navigator.push({
      name: routeName,
      transitionType: transitionType
    })
  }

  testingGET(url) {
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson.message)
      })
    .catch((error =>
      console.error(error)
    ))
  }

  render() {
    return (
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
      <View style={styles.mainHeader}>
      <Image
        source={require('./Icons/User-Menu-Male-48.png')}
        style={styles.settingsIcon}
      />
        <Text style={styles.schoolTitle} onPress={this.testingGET('http://localhost:3000/api')}>{SCHOOL_NAME}</Text>
        <TouchableHighlight onPress={this.navigate.bind(this, 'customize', 'down')}>
          <Image
            source={require('./Icons/Settings-48.png')}
            style={styles.settingsIcon}
          />
        </TouchableHighlight>
      </View>

      <Tile
        navigator={this.props.navigator}
        navName={HOME_PORTALS[0]['navName']}
        imgSource={HOME_PORTALS[0]['imgName']}
        text={HOME_PORTALS[0]['txtName']}
        style={styles.homeTile1}
      />

      <Tile
        navigator={this.props.navigator}
        navName={HOME_PORTALS[1]['navName']}
        imgSource={HOME_PORTALS[1]['imgName']}
        text={HOME_PORTALS[1]['txtName']}
        style={styles.homeTile2}
      />

      <Tile
        navigator={this.props.navigator}
        navName={HOME_PORTALS[2]['navName']}
        imgSource={HOME_PORTALS[2]['imgName']}
        text={HOME_PORTALS[2]['txtName']}
        style={styles.homeTile2}
      />

      <Tile
        navigator={this.props.navigator}
        navName={HOME_PORTALS[3]['navName']}
        imgSource={HOME_PORTALS[3]['imgName']}
        text={HOME_PORTALS[3]['txtName']}
        style={styles.homeTile1}
      />

      <Tile
        navigator={this.props.navigator}
        navName={HOME_PORTALS[4]['navName']}
        imgSource={HOME_PORTALS[4]['imgName']}
        text={HOME_PORTALS[4]['txtName']}
        style={styles.homeTile1}
      />

      <Tile
        navigator={this.props.navigator}
        navName={HOME_PORTALS[5]['navName']}
        imgSource={HOME_PORTALS[5]['imgName']}
        text={HOME_PORTALS[5]['txtName']}
        style={styles.homeTile2}
      />


      <TouchableHighlight onPress={ this.navigate.bind(this, 'more', 'up')}>
        <View style={styles.nextButton}>
          <Image
            source={require('./Icons/Sort-Down-50-White.png')}
            style={styles.downIcon}
          />
        </View>
      </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

  /* Style for three of the main home screen tile buttons */
  homeTile1: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width/2.05,
    height: height/4,
    paddingBottom: 20,
    margin: 2,
    backgroundColor: COLOR1,
  },

  /* Style for the other three of the main home screen tile buttons */
  homeTile2: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width/2.05,
    height: height/4,
    paddingBottom: 20,
    margin: 2,
    backgroundColor: COLOR2,
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
  }

});

AppRegistry.registerComponent('Root', () => Root);
