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
  Modal,
  AsyncStorage,
  PixelRatio
} from 'react-native';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';

const SCHOOL_NAME = 'Seabird University'; // used for the title bar (although this will eventually be an image)
const { height, width } = Dimensions.get('window');
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

var SCHOOL_FONT_SIZE = 32;

if (PixelRatio.get() <= 2) {
  SCHOOL_FONT_SIZE = 26;
}

export default class Root extends Component {


  navigate(routeName, transitionType = 'floatRight') {
    this.props.navigator.push({ name: routeName, transitionType });
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      modalVisible: false,
    };
  }

  async login(email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      Database.listenUserHomeOrder((value) => {
        if (value != '' && value != '[]') {
          this.props.updateHome(value);
          Database.setUserHomeOrder(value);
          this.navigate('root')
        } else {
          this.navigate('root')
        }
      })
    } catch (e) {
      /* Toggles the error modal */
      this.setModalVisible(!this.state.modalVisible)
      console.log(e)
    }
  }

  signup = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage)
    });
  }

  userIsSignedIn = () => {
    console.log('USER IS ALREADY SIGNED IN');
    console.log(Firebase.getUser());
    this.props.navigator.push({name: 'root'});
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  updateText = (user, pass) => {
    this.setState((state) => {
      return {
        username: user,
        password: pass,
      };
    });
  };

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
      <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={styles.modalView}>
          <View>
            <Text style={styles.modalTitle}>Failed Login</Text>
            <Text style={styles.modalText}>There is a login Error</Text>

            <TouchableHighlight underlayColor="transparent" onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}
            style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>
        <Text style={styles.company}>seabird apps</Text>
        <Text style={styles.schoolName}>{SCHOOL_NAME}</Text>
        {/*<Image
          source={require('./../Icons/breakfast-dark.png')}
          style={styles.schoolImage}
        />*/}
        <TextInput
          style={styles.credentials}
          onChangeText={username => this.setState({ username })}
          //onFocus={() => this.updateText('', this.state.password)}
          autoFocus={true}
          placeholder="Username"
          value={this.state.username}
          returnKeyType = {"next"}
          onSubmitEditing={(event) => {
            this.refs.Password.focus();
          }}
        />
        <View style={styles.divider} />
        <TextInput
          ref='Password'
          secureTextEntry={true}
          style={styles.credentials}
          onChangeText={password => this.setState({ password })}
          //onFocus={() => this.updateText(this.state.username, '')}
          placeholder="Password"
          value={this.state.password}
          onSubmitEditing={(event) => {
            this.login(this.state.username, this.state.password)
          }}
        />
        <View style={styles.divider} />
        <TouchableHighlight style={styles.login} onPress={() => this.login(this.state.username, this.state.password)}>
          <Text style={styles.loginText}>LOG IN</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.login} onPress={() => this.signup(this.state.username, this.state.password)}>
          <Text style={styles.loginText}>SIGN UP</Text>
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
    fontSize: SCHOOL_FONT_SIZE,
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
    height: 40,
    //backgroundColor: '#eee',
    color: '#111',
    width: width / 1.6,
    alignSelf: 'center',
    textAlign: 'left',
    marginTop: 20,
    borderRadius: 5,
    paddingLeft: 10,
    // borderColor: '#111',
    // borderWidth: 1
  },

  /* Style for the divder that will be the underline area */
  divider: {
    height: 1,
    width: width / 1.6,
    backgroundColor: 'black'
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
  },

  /* Style for the modal view */
  modalView: {
    width: width / 1.2,
    height: height / 6,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginTop: height / 2.5,
    paddingTop: 10,
    borderRadius: 10,
  },

  /* Style for the modal title */
  modalTitle: {
    color: 'black',
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center',
  },

  /* Style for the modal text */
  modalText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 5,
  },

  /* Style for the modal action button */
  modalButton: {
    height: 30,
    width: 100,
    alignSelf: 'center',
    backgroundColor: '#bbb',
    paddingTop: 5,
    borderRadius: 5,
    marginTop: 10,
  },

  /* Style for the modal action button text */
  modalButtonText: {
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('Login', () => Login);
