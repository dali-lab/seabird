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

export default class Root extends Component {

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
      <Image
        source={require('./Icons/Restaurant-50.png')}
        style={styles.mainIcon}
      />
      <Text style={styles.schoolTitle}>Dartmouth College</Text>
      <Image
        source={require('./Icons/Restaurant-50.png')}
        style={styles.mainIcon}
      />
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
      <TouchableHighlight onPress={this.navigate.bind(this, 'news')}>
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
      <TouchableHighlight onPress={this.navigate.bind(this, 'settings')}>
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
      <TouchableHighlight onPress={this.navigate.bind(this, 'sports')}>
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
    height: 70,
    marginBottom: 15,
    backgroundColor: '#2b2b2b',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  /* Style for the school title text */
  schoolTitle: {
    fontSize: 23,
    fontFamily: 'System',
    fontWeight: '300',
    color: '#fff',
    letterSpacing: -0.56,
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
    marginTop: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    backgroundColor: '#3c96c3',
  },

  /* Style for the main label holder */
  mainLabelHolder: {
    top: 40,
    width: 150,
    height: 45,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: 'white',
  },

  /* Style for the main label texts on the main buttons */
  mainLabel: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '500',
    textAlign: 'center',
    color: '#444',
    paddingTop: 10,
  },

  /* Style for the icons on the main buttons */
  mainIcon: {
    top: 10,
  },

});

AppRegistry.registerComponent('Root', () => Root);
