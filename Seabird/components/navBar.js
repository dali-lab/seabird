import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableHighlight,
    Image,
} from 'react-native';
import { BackButton } from './backButton';
import { HomeButton } from './homeButton';

// This is a navigation bar containing two buttons on either side, and text in the center.
const { width } = Dimensions.get('window');

export class NavBar extends Component {

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({ name: routeName, transitionType });
  }

  render() {
    if (this.props.rightButton === 'True') {
      return (
        <View style={styles.mainHeader}>
          <TouchableHighlight style={styles.userIcon} underlayColor="transparent" onPress={this.navigate.bind(this, 'settings', 'down')}>
            <Image source={require('./../Icons/User-Menu-Male-48.png')} />
          </TouchableHighlight>
          <Text style={styles.title}>{this.props.schoolTitle}</Text>
          <TouchableHighlight style={styles.settingsIcon} underlayColor="transparent" onPress={this.navigate.bind(this, 'customize', 'down')}>
            <Image source={require('./../Icons/Settings-48.png')} />
          </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={styles.mainHeader}>
        <BackButton navigator={this.props.navigator} type={this.props.type} />
        <Text style={styles.title}> {this.props.text} </Text>
        <HomeButton navigator={this.props.navigator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the header section that holds the school name and crest */
  rootHeader: {
    width,
    height: 60,
    backgroundColor: '#00713A',
    flexDirection: 'row',
    paddingTop: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  mainHeader: {
    width,
    height: 62,
    backgroundColor: '#00713A',
    paddingTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },

  /* Style for the title of the navigation bar */
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '400',
    marginTop: -3,
  },

  /* Style for the icons on the main buttons */
  mainIcon: {
    top: 10,
  },

  /* Style for the settings icon up in the top bar */
  settingsIcon: {
    flex: 0,
    height: 30,
    marginRight: 15,
  },

  /* Styles the user icon */
  userIcon: {
    flex: 0,
    height: 10,
    marginLeft: 15,
  },
});
