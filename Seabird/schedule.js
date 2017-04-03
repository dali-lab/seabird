import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Dimensions,
    Image,
} from 'react-native';
import { NavBar } from './components/navBar';
import { apiSaveSchedule } from './api';

const NAVBAR_TEXT = 'Schedule';
const { height, width } = Dimensions.get('window');

export default class Schedule extends Component {

  render() {
    // NOTE: put this in TouchableHighlight:
    //   onPress={() => apiSaveSchedule()}
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
        <View style={styles.mainContent}>
          <View style={{ flex: 1 }}>
            <Image
              source={require('./Icons/General-Schedule.png')}
              style={{
                height: (height / 100) * 70,
                width: (width / 100) * 70,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TouchableHighlight>
              <View style={styles.uploadImage}>
                <Text style={styles.CTA}>Upload an Image</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  pageContent: {
    flex: 1,
  },

  /* Style for the main section that will hold all the of the Schedule content */
  mainContent: {
    flex: 1,
    height: height / 2,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
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

  /* Style for the CTA button */
  CTA: {
    width: width / 2,
    height: 50,
    borderWidth: 2,
    borderColor: '#89E1A9',
    borderRadius: 25,
    paddingTop: 15,
    color: '#89E1A9',
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('Schedule', () => Schedule);
