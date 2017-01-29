/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Seabird extends Component {
  render() {
    return (
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
      <View style={styles.mainHeader}>
        <TouchableHighlight>
          <View style={styles.hamburgerMenu}></View>
        </TouchableHighlight>
      </View>
      <TouchableHighlight onPress={this.navigate.bind(this, 'dds')}>
        <View style={styles.mainSection}>
        <Image
          source={require('./Icons/Restaurant-50.png')}
          style={styles.mainIcon}
        />
          <Text style={styles.mainLabel}>DDS HOURS</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight>
        <View style={styles.mainSection}>
        <Image
          source={require('./Icons/T-Shirt-50.png')}
          style={styles.mainIcon}
        />
          <Text style={styles.mainLabel}>LAUNDRY</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight>
        <View style={styles.mainSection}>
        <Image
          source={require('./Icons/News-50.png')}
          style={styles.mainIcon}
        />
          <Text style={styles.mainLabel}>NEWS</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight>
        <View style={styles.mainSection}>
        <Image
          source={require('./Icons/Map Marker-50.png')}
          style={styles.mainIcon}
        />
          <Text style={styles.mainLabel}>CAMPUS NEWS</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight>
        <View style={styles.mainSection}>
        <Image
          source={require('./Icons/Calendar-50.png')}
          style={styles.mainIcon}
        />
          <Text style={styles.mainLabel}>SCHEDULE</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight>
        <View style={styles.mainSection}>
        <Image
          source={require('./Icons/Sport-50.png')}
          style={styles.mainIcon}
        />
          <Text style={styles.mainLabel}>SPORTS</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.nextButton}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the header section that holds the school name and crest */
  mainHeader: {
    width: 400,
    height: 80,
    marginTop: 20,
    backgroundColor: 'white',
  },

  /* Style for the six buttons on the main page */
  mainSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    borderRadius: 5,
    paddingBottom: 20,
    margin: 8,
    backgroundColor: '#ccc',
  },

  /* Style for the bottom button that moves to the next page */
  nextButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
    marginTop: 5,
    backgroundColor: '#99ff66',
  },

  /* Style for the main labels on the main buttons */
  mainLabel: {
    top: 30,
    fontSize: 18,
    fontFamily: 'Avenir Next',
    fontWeight: '500',
  },

  /* Style for the icons on the main buttons */
  mainIcon: {
    top: 10,
  },

  /* Style for the hamburgerMenu */
  hamburgerMenu: {
    width: 40,
    height: 40,
    left: 30,
    top: 10,
    backgroundColor: 'black',
  }
});

AppRegistry.registerComponent('Seabird', () => Seabird);
