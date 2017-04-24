import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableHighlight,
    Image,
} from 'react-native';

// This is a navigation bar containing two buttons on either side, and text in the center.
const { width } = Dimensions.get('window');


export class NavBar extends Component {

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({ name: routeName, transitionType });
  }

  render() {
    return (
      <View style={styles.mainHeader}>
        <TouchableHighlight underlayColor="transparent" onPress={this.navigate.bind(this, 'settings', 'down')}>
          <Image source={require('./../Icons/User-Menu-Male-48.png')} style={styles.settingsIcon} />
        </TouchableHighlight>
        <Text style={styles.schoolTitle}>{this.props.schoolTitle}</Text>
        <TouchableHighlight underlayColor="transparent" onPress={this.navigate.bind(this, 'customize', 'down')}>
          <Image source={require('./../Icons/Settings-48.png')} style={styles.settingsIcon} />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    /* Style for the header section that holds the school name and crest */
  mainHeader: {
    width,
    height: 60,
    marginBottom: 2,
    backgroundColor: '#00713A',
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
    textAlign: 'center',
    flex: 2,
    marginRight: 50,
  },

    /* Second style for the school title text */
  schoolTitleSecond: {
    fontSize: 23,
    fontFamily: 'System',
    fontWeight: '300',
    color: '#fff',
    letterSpacing: -0.56,
    textAlign: 'center',
    flex: 3,
    marginRight: 50,
  },

    /* Third style for the school title text */
  schoolTitleThird: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '300',
    color: '#fff',
    letterSpacing: -0.56,
  },
});
