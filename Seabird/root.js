
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';

import { Tile } from './components/tile';



const COLOR1 = '#9ECA7A'; // used for 3/6 buttons and the Next button (NOTE: original color)
const COLOR2 = '#AAD984'; // used for the other 3/6 buttons
const SCHOOL_NAME = 'Dartmouth College'; // used for the title bar (although this will eventually be an image)


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

  testingGet() {
    fetch('http://localhost:3000/api/schools/58a0c251ed202b214aff3a08/views/58a0c251ed202b214aff3a0b')
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson.url)
      })
    console.log('Ijemma was here')
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
        <Text style={styles.schoolTitle}>{SCHOOL_NAME}</Text>
        <TouchableHighlight onPress={this.navigate.bind(this, 'settings', 'down')}>
          <Image
            source={require('./Icons/Settings-50-White.png')}
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
    width: 400,
    height: 70,
    marginBottom: 15,
    backgroundColor: '#2b2b2b',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  /* Style for the school title text */
  schoolTitle: {
    fontSize: 23,
    fontFamily: 'System',
    fontWeight: '300',
    color: '#fff',
    letterSpacing: -0.56,
  },

  /* Style for three of the main home screen tile buttons */
  homeTile1: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    width: 150,
    height: 150,
    borderRadius: 5,
    paddingBottom: 20,
    margin: 8,
    backgroundColor: COLOR2,
  },

  /* Style for the other three of the main home screen tile buttons */
  homeTile2: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    width: 150,
    height: 150,
    borderRadius: 5,
    paddingBottom: 20,
    margin: 8,
    backgroundColor: COLOR1,
  },

  /* Style for the bottom button that moves to the next page */
  nextButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
    marginTop: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    backgroundColor: COLOR2,
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
