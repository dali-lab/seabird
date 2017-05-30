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
import { NavBar } from './../components/navBar';
import { apiSaveSchedule } from './../api';

const NAVBAR_TEXT = 'Schedule';
const { height, width } = Dimensions.get('window');

export default class Schedule extends Component {

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
        <View style={styles.mainContent}>
          <View>
            <Image
              source={require('./../Icons/General-Schedule.png')}
              style={{
                height: height / 1.1,
                width: width / 1.05,
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the enter page */
  pageContent: {
    flex: 1,
    backgroundColor: 'white',
  },

  /* Style for the main section that will hold all the of the Schedule content */
  mainContent: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
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
});

AppRegistry.registerComponent('Schedule', () => Schedule);
