import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import Database from '../firebase/database';

const { height, width } = Dimensions.get('window');
const firebase = require('firebase/app');

require('firebase/auth');
require('firebase/database');

let _scrollView: ScrollView;

export default class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      modalVisible: false,
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  async login(email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      Database.listenUserHomeOrder((value) => {
        if (value !== '' && value !== '[]' && value !== null && value !== undefined && !(value.length <= 0)) {
          this.props.updateHome(value);
          Database.setUserHomeOrder(value);
          this.navigate('root');
        } else {
          this.navigate('root');
        }
      });
    } catch (e) {
            /* Toggles the error modal */
      this.setModalVisible(!this.state.modalVisible);
    }
  }

  navigate(routeName, transitionType = 'floatRight') {
    this.props.navigator.push({ name: routeName, transitionType });
  }

  scrollScreen = (yVal) => {
    _scrollView.scrollTo({y: yVal});
  }

  render() {
      return (
          <View>

              {/* Error popup */}
            <Modal
                animationType={'fade'}
                transparent
                visible={this.state.modalVisible}
                onRequestClose={() => { alert('Modal has been closed.'); }}
            >
              <View style={styles.modalView}>
                <View>
                  <Text style={styles.modalTitle}>Login Failed</Text>
                  <Text style={styles.modalText}>There is a login error</Text>

                  <TouchableHighlight
                      underlayColor="transparent" onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                      this.state.username = '';
                      this.state.password = '';
                  }}
                      style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>Retry</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>

            <ScrollView ref={(scrollView) => { _scrollView = scrollView; }}>
              {/* Main background image */}
            <Image
                source={require('../Icons/Login/gradient_background.png')}
                style={styles.gradientBackground}
            >

                {/* View that holds everything on the screen */}
              <View style={styles.mainView}>

                  {/* Dartmouth logo */}
                <Image
                    source={require('../Icons/Login/dartmouth_logo.png')}
                    style={styles.logo}
                />

                  {/* Email text field*/}
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <Image
                      source={require('../Icons/Login/email.png')}
                      style={styles.emailField}
                  />
                  <TextInput
                      ref="Email"
                      style={styles.credentials}
                      onChangeText={username => this.setState({ username })}
                      placeholder="EMAIL"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      selectionColor="white"
                      keyboardType="email-address"
                      value={this.state.username}
                      returnKeyType={'next'}
                      onSubmitEditing={(event) => {
                          this.refs.Password.focus();
                      }}
                      onFocus={() => _scrollView.scrollTo({y: 80})}
                      onEndEditing={() => _scrollView.scrollTo({y: 0})}
                  />
                </View>

                  {/* Divider between email text field and password text field*/}
                <View style={styles.divider} />

                  {/* Password text field*/}
                <View style={{ flexDirection: 'row', marginTop: 2 }}>
                  <Image
                      source={require('../Icons/Login/lock.png')}
                      style={styles.passwordField}
                  />
                  <TextInput
                      ref="Password"
                      secureTextEntry
                      style={styles.credentials}
                      onChangeText={password => this.setState({ password })}
                      placeholder="PASSWORD"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      selectionColor="white"
                      value={this.state.password}
                      onSubmitEditing={(event) => {
                          this.login(this.state.username, this.state.password);
                      }}
                      onFocus={() => _scrollView.scrollTo({y: 100})}
                      onEndEditing={() => _scrollView.scrollTo({y: 0})}
                  />
                </View>

                  {/* Divider between password text field and login button*/}
                <View style={styles.divider} />


                  {/* Login button*/}
                <View style={{ marginTop: 15 }}>
                  <TouchableHighlight
                      underlayColor="transparent"
                      onPress={() => this.login(this.state.username, this.state.password)}
                  >
                    <Image
                        source={require('../Icons/Login/login_button.png')}
                        style={styles.loginButton}
                    />
                  </TouchableHighlight>
                </View>
                <View style={{alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-end', height: height / 4.8,}}>
                <View style={{backgroundColor: 'rgba(18, 89, 80, 0.3)', width, height: 60,}}>
                  {/* Not a member text*/}
                <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', marginTop: 7,}}>Not a member?</Text>

                  {/* Sign Up button*/}
                <TouchableHighlight underlayColor="transparent" onPress={() => this.navigate('userType', 'right')}>
                  <Text style={styles.signUpButton}>Sign Up!</Text>
                </TouchableHighlight>
                </View>
              </View>
              </View>
            </Image>
            </ScrollView>
          </View>
      );
  }
}

const styles = StyleSheet.create({

  // Style for main background image.
  gradientBackground: {
    height,
    width,
    resizeMode: 'stretch',
    flexDirection: 'column',
    alignItems: 'center',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    height: height
    },
    // Style for the main view
  mainView: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: height / 5,
  },
    // Style for the logo
  logo: {
    marginTop: 30,
    height: width / 2,
    width: width / 2,
    resizeMode: 'contain',
  },
    // Style for the email text input field
  emailField: {
    height: height / 26,
    width: width / 13,
    resizeMode: 'contain',
    marginLeft: width / 10,
    top: 15,
  },
    // Style for the password field
  passwordField: {
    height: height / 26,
    width: width / 13,
    resizeMode: 'contain',
    marginLeft: width / 10,
    marginTop: 3.5,
    top: 10,
  },
  /* Style for the credentials text input */
  credentials: {
    color: 'white',
    width: width / 1.39,
    textAlign: 'left',
    height: height / 17,
    paddingLeft: 10,
    marginTop: 10,
    fontFamily: 'Lato',
    fontWeight: '400',
  },
  /* Style for the divider that will be the underline area */
  divider: {
    height: 1,
    width: width / 1.39,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },

  loginButton: {
    height: height / 16,
    width: width / 1.39,
    resizeMode: 'contain',
  },
    // Style for the sign up button
  signUpButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

//   /* Style for the modal view */
  modalView: {
    width: width / 1.2,
    height: height / 6,
    backgroundColor: 'rgba(240, 240, 240, 0.9)',
    alignSelf: 'center',
    marginTop: height / 2.5,
    paddingTop: 10,
    borderRadius: 10,
  },

  /* Style for the modal title */
  modalTitle: {
    color: 'black',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Avenir Next',
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
    backgroundColor: 'rgba(179, 179, 179, 0.9)',
    paddingTop: 5,
    borderRadius: 15,
    marginTop: 10,
  },

  /* Style for the modal action button text */
  modalButtonText: {
    textAlign: 'center',
    fontFamily: 'Avenir Next',
  },
});

AppRegistry.registerComponent('Login', () => Login);
