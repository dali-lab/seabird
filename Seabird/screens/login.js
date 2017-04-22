import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableHighlight,
} from 'react-native';

const SCHOOL_NAME = 'Seabird University'; // used for the title bar (although this will eventually be an image)
const { height, width } = Dimensions.get('window');

export default class Root extends Component {

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({ name: routeName, transitionType });
  }

  constructor(props) {
    super(props);
    this.state = {
      username: 'Username',
      password: 'Password',
    };
  }

  updateText = (user, pass) => {
    this.setState((state) => {
      return {
        username: user,
        password: pass,
      };
    });
  };

  // TODO: consider using ScrollView instead to load all home tiles at beginning
  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: '#ddd',
          height,
        }}
      >
        <Text style={styles.company}>seabird apps</Text>
        <Text style={styles.schoolName}>{SCHOOL_NAME}</Text>
        <Image
          source={require('./../Icons/breakfast-dark.png')}
          style={styles.schoolImage}
        />
        <TextInput
          style={styles.credentials}
          onChangeText={username => this.setState({ username })}
          onFocus={() => this.updateText('', this.state.password)}
          value={this.state.username}
        />
        <TextInput
          style={styles.credentials}
          onChangeText={password => this.setState({ password })}
          onFocus={() => this.updateText(this.state.username, '')}
          value={this.state.password}
        />
        <TouchableHighlight style={styles.login} onPress={this.navigate.bind(this, 'root')}>
          <Text style={styles.loginText}>LOG IN</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the company name */
  company: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: height / 60,
  },

  /* Style for the school name */
  schoolName: {
    fontSize: 32,
    textAlign: 'center',
    width: width / 2.5,
    letterSpacing: 0.5,
    marginBottom: height / 30,
  },

  /* Style for the school image */
  schoolImage: {
    height: height / 3,
    width: 100,
    marginBottom: height / 60,
  },

  /* Style for the credentials text input */
  credentials: {
    height: 35,
    backgroundColor: 'black',
    color: 'white',
    width: width / 1.6,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 20,
  },

  /* Style for the Login button */
  login: {
    height: 35,
    width: width / 1.6,
    backgroundColor: 'green',
    marginTop: height / 15,
    borderRadius: 5,
  },

  /* Style for the login button text */
  loginText: {
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 1,
    fontWeight: '500',
  }
});

AppRegistry.registerComponent('Login', () => Login);
