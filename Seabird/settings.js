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
import { NavBar } from './components/navBar';


const NAVBAR_TEXT = 'Settings';

export default class Settings extends Component {
  // Initialize the hardcoded data

  constructor(props) {
      super(props);
      this.state = {
          bounceValue: new Animated.Value(0),
          userFirstName: '',
          userLastName: '',
          userEmail: '',
      };
  };

  componentDidMount() {
      AsyncStorage.getItem('userFirstName').then((value) => {
          this.setState({ userFirstName: value });
      }).done();
      AsyncStorage.getItem('userLastName').then((value) => {
          this.setState({ userLastName: value });
      }).done();
      AsyncStorage.getItem('userEmail').then((value) => {
          this.setState({ userEmail: value });
      }).done();
  }

  navigatePush(routeName) {
    this.props.navigator.push({
      name: routeName,
    });
  }

  saveData(key, value) {
    AsyncStorage.setItem(key, value);
    this.setState({ key: value });
  }

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} type='down' />
        <View style={styles.mainContent}>
          <View style={styles.contentHeader}>
            <Text style={styles.settingsTitle}>Hi, {this.state.userFirstName} a {this.state.userLastName}!</Text>
            <Text style={styles.settingsText}>First Name: </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                  this.setState({ userFirstName: text });
                  this.saveData('userFirstName', text);
              }}
              value={this.state.userFirstName}
              placeholder="Enter your first name here"
            />

            <Text style={styles.settingsText}>Last Name: </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                  this.setState({ userLastName: text });
                  this.saveData('userLastName', text);
              }}
              value={this.state.userLastName}
              placeholder="Enter your last name here"
            />

            <Text style={styles.settingsText}>Email: </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                  this.setState({ userEmail: text });
                  this.saveData('userEmail', text);
              }}
              value={this.state.userEmail}
              placeholder="Enter your email here"
            />

            <Button
              onPress={this.navigatePush.bind(this, 'customize')}
              title="Customize"
              color="#841584"
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
