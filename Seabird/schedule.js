import React, { Component } from 'react';
import { Image, Animated, StyleSheet, LinkingIOS, ScrollView, ListView, View, Text, Navigator, AppRegistry, PropTypes, TouchableHighlight, WebView, Dimensions } from 'react-native';
import { NavBar } from './components/navBar';

const NAVBAR_TEXT = 'Schedule';
const {height, width} = Dimensions.get('window');

export default class Schedule extends Component {
  // Initialize the hardcoded data

  saveSchedule() {
    // Send a POST request to store user image in the database
    /*fetch('https://localhost:3000/api/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: 'user1',
        image: 'text_representation_of_image',
      })
    })*/
  }

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
        <View style={styles.mainContent}>
          <Text style={styles.contentHeader}> Save your schedule here! </Text>
          <TouchableHighlight onPress={this.saveSchedule()}>
          <View style={styles.uploadImage}>
            <Text style={{
              color: '#89E1A9',
              textAlign: 'center',
              marginTop: 14,
          }}>Upload an Image</Text>
            </View>
          </TouchableHighlight>
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

  /* Style for the main section that will hold all the of the Schedule content */
  mainContent: {
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  /* Style for the content's main Header */
  contentHeader: {
    fontSize: 28,
    fontFamily: 'System',
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 0.5,
    width: width / 1.5,
    marginTop: height / 8,
  },

  /* Style for the button that will allow the user to upload an image */
  uploadImage: {
    width: width / 1.5,
    height: 50,
    borderRadius: 50,
    borderColor: '#89E1A9',
    borderWidth: 2,
    marginTop: 100,
  }
});

AppRegistry.registerComponent('Schedule', () => Schedule);
