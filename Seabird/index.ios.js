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
  View,
  TouchableHighlight,
  Image,
} from 'react-native';

export default class Seabird extends Component {

  navigate(routeName) {
    this.props.navigator.push({
      name: routeName
    })
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
        <View style={styles.mainLabelHolder}>
          <Text style={styles.mainLabel}>DDS Hours</Text>
          </View>
        </View>
      </TouchableHighlight>
      <TouchableHighlight>
        <View style={styles.mainSection}>
        <Image
          source={require('./Icons/T-Shirt-50.png')}
          style={styles.mainIcon}
        />
        <View style={styles.mainLabelHolder}>
          <Text style={styles.mainLabel}>Laundry</Text>
          </View>
        </View>
      </TouchableHighlight>
      <TouchableHighlight>
        <View style={styles.mainSection}>
        <Image
          source={require('./Icons/News-50.png')}
          style={styles.mainIcon}
        />
        <View style={styles.mainLabelHolder}>
          <Text style={styles.mainLabel}>News</Text>
          </View>
        </View>
      </TouchableHighlight>
      <TouchableHighlight>
        <View style={styles.mainSection}>
        <Image
          source={require('./Icons/Map Marker-50.png')}
          style={styles.mainIcon}
        />
        <View style={styles.mainLabelHolder}>
          <Text style={styles.mainLabel}>Campus News</Text>
          </View>
        </View>
      </TouchableHighlight>
      <TouchableHighlight>
        <View style={styles.mainSection}>
        <Image
          source={require('./Icons/Calendar-50.png')}
          style={styles.mainIcon}
        />
        <View style={styles.mainLabelHolder}>
          <Text style={styles.mainLabel}>Schedule</Text>
          </View>
        </View>
      </TouchableHighlight>
      <TouchableHighlight>
        <View style={styles.mainSection}>
        <Image
          source={require('./Icons/Sport-50.png')}
          style={styles.mainIcon}
        />
        <View style={styles.mainLabelHolder}>
          <Text style={styles.mainLabel}>Sports</Text>
          </View>
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
    backgroundColor: 'gray',
  },

  /* Style for the six buttons on the main page */
  mainSection: {
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
    backgroundColor: '#80BBD8',
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

  /* Style for the main label holder */
  mainLabelHolder: {
    top: 40,
    width: 150,
    height: 40,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: 'white',
  },

  /* Style for the main label texts on the main buttons */
  mainLabel: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '500',
    textAlign: 'center',
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
