import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight,
} from 'react-native';

const { height, width } = Dimensions.get('window');
const firebase = require('firebase/app');

require('firebase/auth');
require('firebase/database');

export default class UserType extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      userType: ''
    };
  }

  navigate(routeName, transitionType = 'floatRight') {
    this.props.navigator.push({name: routeName, transitionType});
  }

  setUser() {
    if (this.state.userType !== '') {
        this.props.updateUserType(this.state.userType);
        this.navigate('signup');
    }
  }

    render() {
      return (
        <View>

            {/* Main background image */}
            <Image
                source={require('../Icons/Login/gradient_background.png')}
                style={styles.gradientBackground}
            >

                {/* View that holds everything on the screen */}
                <View style={styles.mainView}>

                    {/*Back button*/}
                    <TouchableHighlight
                        underlayColor='transparent'
                        onPress={() => this.navigate('login', 'left')}
                    >
                        <Image source={require('../Icons/Signup/back_button_icon.png')}
                               style={styles.backButton}
                        />
                    </TouchableHighlight>

                    {/* Welcome to text */}
                    <Text
                        style={styles.lightText}
                    >Welcome to</Text>

                    {/*Dartmouth text*/}
                    <Text
                        style={{color: 'white', fontWeight: '500', fontSize: 28}}
                    >DARTMOUTH</Text>

                    {/* Dartmouth logo */}
                    <Image
                        source={require('../Icons/Login/dartmouth_logo.png')}
                        style={styles.logo}
                    >
                    </Image>

                    {/*I am a text field*/}
                    <Text
                        style={{color: 'white', fontStyle: 'italic', fontSize: 21, fontWeight: '100', marginTop: 10}}
                    >I am a... {this.state.userType}</Text>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 12}}>

                        <View>
                          <TouchableHighlight
                              underlayColor="transparent"
                              onPress={userType => this.setState({ userType: 'student' })}>
                              <View style={{flexDirection: 'column', alignItems: 'center', marginRight: 20, marginLeft: -2}}>
                                  <Image
                                      source={require('../Icons/userType/student.png')}
                                      style={{height: width / 7, width: width / 7, resizeMode: 'contain'}}>
                                  </Image>
                                  <Text
                                      style={{textAlign: 'center', color: 'white', fontWeight: '400'}}
                                  >STUDENT</Text>
                              </View>
                          </TouchableHighlight>
                        </View>

                        <View>
                            <TouchableHighlight
                                underlayColor="transparent"
                                onPress={userType => this.setState({ userType: 'alum' })}>
                                <View style={{flexDirection: 'column', alignItems: 'center', marginRight: -10}}>
                                    <Image
                                        source={require('../Icons/userType/alum.png')}
                                        style={{height: width / 7, width: width / 7, resizeMode: 'contain'}}>
                                    </Image>
                                    <Text
                                        style={{textAlign: 'center', color: 'white', fontWeight: '400'}}
                                    >ALUMNI</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View>

                            <TouchableHighlight
                                underlayColor="transparent"
                                onPress={userType => this.setState({ userType: 'professor' })}>
                                <View style={{flexDirection: 'column', alignItems: 'center', marginLeft: 20, marginRight: -13}}>
                                    <Image
                                        source={require('../Icons/userType/prof.png')}
                                        style={{height: width / 7, width: width / 7, resizeMode: 'contain'}}>
                                    </Image>
                                    <Text
                                        style={{textAlign: 'center', color: 'white', fontWeight: '400'}}
                                    >PROFESSOR</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                    </View>


                    {/*Next button*/}
                    <View style={{marginTop: 15}}>
                        <TouchableHighlight
                                            underlayColor="transparent"
                                            onPress={() => this.setUser()}>
                            <Image source={require('../Icons/userType/next.png')}
                                   style={styles.loginButton}
                            />
                        </TouchableHighlight>
                    </View>
                </View>
            </Image>
        </View>
      )
    }
}

const styles = StyleSheet.create({

    // Style for main background image.
    gradientBackground: {
        height: height,
        width: width,
        resizeMode: 'stretch',
        flexDirection: 'column',
        alignItems: 'center'
    },
    // Style for the light text on the screen
    lightText: {
        color: 'white',
        fontWeight: '100',
        fontStyle: 'italic',
        fontSize: 21,
        marginTop: -70,
    },
    // Style for the main view
    mainView: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: height / 5
    },
    // Style for the logo
    logo: {
        height: width / 2,
        width: width / 2,
        resizeMode: 'contain',
        marginTop: 25,
    },
    // Style for the name text input field
    nameField: {
        height: height / 25,
        width: width / 13,
        resizeMode: 'contain',
        marginLeft: width / 10,
        marginTop: 5
    },
    // Style for the year text input
    yearField: {
        height: height / 25,
        width: width / 13,
        resizeMode: 'contain',
        marginLeft: width / 10,
        marginTop: 6
    },
    // Style for the email text input field
    emailField: {
        height: height / 22,
        width: width / 13,
        resizeMode: 'contain',
        marginLeft: width / 10,
        marginTop: 4,
    },
    // Style for the password field
    passwordField: {
        height: height / 22,
        width: width / 13,
        resizeMode: 'contain',
        marginLeft: width / 10,
        marginTop: 3.5
    },
    /* Style for the credentials text input */
    credentials: {
        color: 'white',
        width: width / 1.39,
        textAlign: 'left',
        height: height / 17,
        paddingLeft: 10,
    },
    // Style for the back button
    backButton: {
        height: width / 12,
        width: width / 12,
        resizeMode: 'contain',
        marginTop: -100,
        marginLeft: -(width / 2) + 10,
    },
    /* Style for the divider that will be the underline area */
    divider: {
        height: 1,
        width: width / 1.39,
        backgroundColor: 'white'
    },
    loginButton: {
        height: height / 16,
        width: width / 1.39,
        resizeMode: 'contain'
    },
    // Style for the sign up button
    signUpButton: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
//   /* Style for the modal view */
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
    },
});

AppRegistry.registerComponent('userType', () => UserType);
