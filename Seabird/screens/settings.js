import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated,
    TextInput,
    Button,
    AsyncStorage,
} from 'react-native';
import { NavBar } from './../components/navBar';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';
// import * as firebase from 'firebase';
var firebase = require("firebase/app");
require("firebase/auth");

const NAVBAR_TEXT = 'Settings';

export default class Settings extends Component {
    // Initialize the hardcoded data

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
      changingEmail: false,
      userFirstName: '',
      userLastName: '',
      userEmail: '',
    };
  }

  componentDidMount() {
    // AsyncStorage.getItem('userFirstName').then((value) => {
    //   this.setState({ userFirstName: value });
    // }).done();
    // AsyncStorage.getItem('userLastName').then((value) => {
    //   this.setState({ userLastName: value });
    // }).done();
    // AsyncStorage.getItem('userEmail').then((value) => {
    //   this.setState({ userEmail: value });
    // }).done();
    Database.listenUserFirstName((value) => {
      this.setState({ userFirstName: value });
    });
    Database.listenUserLastName((value) => {
      this.setState({ userLastName: value });
    });
    Database.listenUserEmail((value) => {
      this.setState({ userEmail: value });
    });
  }

  navigatePush(routeName) {
    this.props.navigator.push({ name: routeName });
  }

  saveData = (key, value) => {
    AsyncStorage.setItem(key, value);
    this.setState({ key: value });
  }

  displayChangeEmail = () => {
    if (this.state.changingEmail) {
      return (
        <View>
          <TextInput
            style={styles.textInput} onChangeText={(value) => {
              this.setState({ userEmail: value });
              // this.saveData('userEmail', text);
              // Database.setUserEmail(value);
            }} value={this.state.userEmail} placeholder="Enter your email here"
          />
          <Button onPress={this.toggleChangingEmail} title="Save Email" color="#841584" />
        </View>
      );
    }
    return (
      <Button
        onPress={this.toggleChangingEmail}
        title="Change Email"
        color="#841584"
      />
    );
  }

  toggleChangingEmail = () => {
    if (this.state.changingEmail) {
      Database.setUserEmail(this.state.userEmail);
      this.setState({changingEmail: false})
    } else {
      this.setState({changingEmail: true});
    }
  }

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} type="down" />
        <View style={styles.mainContent}>
          <View style={styles.contentHeader}>
            <Text style={styles.settingsTitle}>Hi, {this.state.userFirstName} {this.state.userLastName}!</Text>
            <Text style={styles.settingsText}>First Name:</Text>
            <TextInput
              style={styles.textInput} onChangeText={(value) => {
                // this.setState({ userFirstName: text });
                // this.saveData('userFirstName', text);
                Database.setUserFirstName(value);
              }} value={this.state.userFirstName} placeholder="Enter your first name here"
            />

            <Text style={styles.settingsText}>Last Name:
                        </Text>
            <TextInput
              style={styles.textInput} onChangeText={(value) => {
                Database.setUserLastName(value);
              }} value={this.state.userLastName} placeholder="Enter your last name here"
            />

            <Text style={styles.settingsText}>Email: {Firebase.getUser().email}</Text>

            {this.displayChangeEmail()}

            <Button onPress={this.navigatePush.bind(this, 'customize')} title="Customize" color="#841584" />

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    /* Style for the enter page */
  pageContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

    /* Style for the main section that will hold all the of the DDS content */
  mainContent: {
    width: 350,
    height: 525,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

    /* Style for the section that holds the swipe headers */
  contentHeader: {
    width: 325,
    height: 125,
    marginTop: 20,
  },

    /* Style for the intro phrase */
  settingsText: {
    fontSize: 18,
    fontFamily: 'System',
    textAlign: 'left',
  },

    /* Style for the intro phrase */
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    marginBottom: 20,
  },

    /* Style for the current meal swipe */
  settingsTitle: {
    fontSize: 28,
    fontFamily: 'System',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
  },

    /* Style for the menu option */
  oldThing: {
    fontSize: 12,
    fontFamily: 'System',
    textAlign: 'left',
    marginTop: 7,
  },

  contentInformation: {
    width: 250,
  },

  listItem: {
    fontSize: 22,
    fontFamily: 'System',
    fontWeight: '400',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },

    /* Style for the divider in the list */
  divider: {
    height: 1,
    backgroundColor: '#bbb',
  },
});

AppRegistry.registerComponent('Settings', () => Settings);
