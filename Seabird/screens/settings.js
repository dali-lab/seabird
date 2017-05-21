import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  Button,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { NavBar } from './../components/navBar';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';

require( "firebase/auth" );

let firebase = require( "firebase/app" );

const { height, width, } = Dimensions.get( 'window' );
const NAVBAR_TEXT = 'Settings';

export default class Settings extends Component {
  // Initialize the hardcoded data

  constructor( props ) {
    super( props );
    this.state = {
      bounceValue: new Animated.Value( 0 ),
      changingEmail: false,
      userWelcomeName: '',
      userFirstName: '',
      userLastName: '',
      userEmail: ''
    };
  }

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({ name: routeName, transitionType });
  }

  navigatePush(routeName) {
    this.props.navigator.push({
      name: routeName,
    });
  }

  componentWillMount( ) {
    Database.listenUserFirstName(( value ) => {
      this.setState({ userFirstName: value });
    });
    Database.listenUserLastName(( value ) => {
      this.setState({ userLastName: value });
    });
    this.setState({ userEmail: Firebase.getUser( ).email })
  }

  logoutUser = () => {
    firebase.auth().signOut().then(function() {
    }).catch(function(error) {
      console.log(error)
    });
    this.navigate('login')
  };

  saveAllSettings = (first, last, email) => {
    Database.setUserFirstName(first);
    Database.setUserLastName(last);
    Database.setUserEmail(email);
  };

  render( ) {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} type="down"/>
        <View style={styles.mainContent}>
          <View style={styles.contentHeader}>
            <Text style={styles.settingsTitle}>Hi, {this.state.userFirstName} {this.state.userLastName}!</Text>
            <Text style={styles.settingsText}>First Name:</Text>
            <TextInput
              ref='FirstName'
              style={styles.textInput}
              onChangeText={( value ) => {
                this.setState({ userFirstName: value })
              }}
              maxLength={15}
              value={this.state.userFirstName}
              placeholder="Enter your first name here" returnKeyType={"next"}
              onSubmitEditing={( event ) => {
                this.refs.LastName.focus( );}}
              />

            <Text style={styles.settingsText}>Last Name:
            </Text>
            <TextInput
              ref='LastName'
              style={styles.textInput}
              onChangeText={( value ) => {
                this.setState({ userLastName: value })
              }}
              maxLength={25}
              value={this.state.userLastName}
              placeholder="Enter your last name here"
            />

            <Text style={styles.settingsText}>Email: </Text>
            <TextInput
              ref='Email'
              style={styles.textInput}
              value={Firebase.getUser( ).email}
            />
            <TouchableHighlight style={styles.saveSettings} onPress={() => this.saveAllSettings(this.state.userFirstName, this.state.userLastName, this.state.userEmail)}>
              <Text style={styles.saveSettingsText}>Save Changes</Text>
            </TouchableHighlight>

            <Button onPress={this.navigate.bind( this, 'customize' )} title="Customize" color="#841584"/>
            <TouchableHighlight onPress={() => this.logoutUser()} style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>Log out</Text>
            </TouchableHighlight>
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
    justifyContent: 'center'
  },

  /* Style for the main section that will hold all the of the DDS content */
  mainContent: {
    width: 350,
    height: 525,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },

  /* Style for the section that holds the swipe headers */
  contentHeader: {
    width: 325,
    height: 125,
    marginTop: 20
  },

  /* Style for the intro phrase */
  settingsText: {
    paddingLeft: width / 27,
    fontSize: 18,
    fontFamily: 'Avenir Next',
    textAlign: 'left'
  },

  /* Style for the current meal swipe */
  settingsTitle: {
    fontSize: 28,
    fontFamily: 'Avenir-Medium',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 30
  },

  /* Style for the menu option */
  oldThing: {
    fontSize: 12,
    fontFamily: 'System',
    textAlign: 'left',
    marginTop: 7
  },

  contentInformation: {
    width: 250
  },

  listItem: {
    fontSize: 22,
    fontFamily: 'System',
    fontWeight: '400',
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },

  /* Style for the divider in the list */
  divider: {
    height: 1,
    backgroundColor: '#bbb'
  },

  /* Style for the button that saves all the changes */
  saveSettings: {
    height: 50,
    width: width / 2,
    backgroundColor: '#aaa',
    alignSelf: 'center',
    borderRadius: 10,
  },

  /* Style for the button that saves all the changes text */
  saveSettingsText: {
    textAlign: 'center',
    color: '#222',
    marginTop: 15,
    fontSize: 16
  },

  /* Style for the text input */
  textInput: {
    width: width / 1.05,
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    marginBottom: 20,
  },

  /* Style for the logout button */
  logoutButton: {
    height: 45,
    borderRadius: 10,
    backgroundColor: '#bd1c00',
    width: width / 2.5,
    alignSelf: 'center',
    marginTop: 5,
    padding: 10,
  },

  /* Style for the logout button text */
  logoutButtonText: {
    fontFamily: 'Avenir Next',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent( 'Settings', ( ) => Settings );
