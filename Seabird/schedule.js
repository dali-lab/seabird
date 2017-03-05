import React, {Component} from 'react';
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
const {height, width} = Dimensions.get('window');

export default class Schedule extends Component {

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
        <View style={styles.mainContent}>
          <Image
            source={require('./Icons/General-Schedule.png')}
            style={{
              height: (height / 100) * 70,
              width: (width / 100) * 70,
              marginTop: height / 4,
            }}
          />
          <TouchableHighlight onPress={() => apiSaveSchedule()}>
            <View style={styles.uploadImage}>
              <Text
                style={{
                  color: '#89E1A9',
                  textAlign: 'center',
                  marginTop: 14,
                }}
              >Upload an Image</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the enter page */
  pageContent: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
  },

  /* Styles the back button */
  backIcon: {
      flex: 0,
      height: 20,
      resizeMode: 'center'
  },

  /* Style for the main section that will hold all the of the Schedule content */
  mainContent: {
    marginTop: 70,
    height: height / 2,
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
      marginTop: height / 8
  },

  /* Style for the button that will allow the user to upload an image */
  uploadImage: {
    width: width / 1.5,
    height: 50,
    borderRadius: 50,
    borderColor: '#89E1A9',
    borderWidth: 2,
    marginTop: 50,
  },
});

AppRegistry.registerComponent('Schedule', () => Schedule);
