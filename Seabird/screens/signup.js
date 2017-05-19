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
} from 'react-native';
import Database from '../firebase/database';

const { height, width } = Dimensions.get('window');
const firebase = require('firebase/app');

require('firebase/auth');
require('firebase/database');

export default class Root extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            year: '',
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
                if (value !== '' && value !== '[]') {
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

    signup = (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ": " + errorMessage)
        });
        this.navigate('root')
    };

    navigate(routeName, transitionType = 'floatRight') {
        this.props.navigator.push({name: routeName, transitionType});
    }

    render() {
        return (
            <View>

                {/* Error popup */}
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert('Modal has been closed.')}}
                >
                    <View style={styles.modalView}>
                        <View>
                            <Text style={styles.modalTitle}>Failed Login</Text>
                            <Text style={styles.modalText}>There is a login Error</Text>

                            <TouchableHighlight underlayColor="transparent" onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                                this.state.username = '';
                                this.state.password = '';
                            }}
                                                style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>Retry</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

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
                            onPress={this.navigate.bind(this, 'userType', 'left')}
                        >
                            <Image source={require('../Icons/Signup/back_button_icon.png')}
                                   style={styles.backButton}
                                />
                    </TouchableHighlight>

                        {/* Let's get you started! text */}
                        <Text
                            style={{color: 'white', fontStyle: 'italic', fontSize: 25, marginTop: -60}}
                        >Let's get you started!</Text>

                        {/* Dartmouth logo */}
                        <Image
                            source={require('../Icons/Login/dartmouth_logo.png')}
                            style={styles.logo}
                        >
                        </Image>

                        {/* Name text field */}
                        <View style={{flexDirection: 'row', marginTop: 2}}>
                            <Image source={require('../Icons/Signup/name_icon.png')}
                                   style={styles.nameField}>
                            </Image>
                        <TextInput
                            ref='Name'
                            style={styles.credentials}
                            onChangeText={name => this.setState({name})}
                            placeholder="Name"
                            placeholderTextColor='rgba(255, 255, 255, 0.8)'
                            selectionColor="white"
                            keyboardType="default"
                            value={this.state.name}
                            returnKeyType={"next"}
                            onSubmitEditing={(event) => {
                                this.refs.Password.focus();
                            }}
                        />
                        </View>

                        {/* Divider between year text field and email text field */}
                        <View style={styles.divider}/>

                        {/*Year text field */}
                        <View style={{flexDirection: 'row', marginTop: 2}}>
                            <Image source={require('../Icons/Signup/year_icon.png')}
                                   style={styles.yearField}>
                            </Image>
                        <TextInput
                            ref='Year'
                            style={styles.credentials}
                            onChangeText={year => this.setState({year})}
                            placeholder="Year"
                            placeholderTextColor='rgba(255, 255, 255, 0.8)'
                            selectionColor="white"
                            keyboardType="default"
                            value={this.state.year}
                            returnKeyType={"next"}
                            onSubmitEditing={(event) => {
                                this.refs.Password.focus();
                            }}
                        />
                    </View>

                        {/* Divider between year text field and email text field */}
                        <View style={styles.divider}/>

                        {/*Email text field*/}
                        <View style={{flexDirection: 'row', marginTop: 2}}>
                            <Image source={require('../Icons/Login/email.png')}
                                   style={styles.emailField}>
                            </Image>
                            <TextInput
                                ref='Email'
                                style={styles.credentials}
                                onChangeText={username => this.setState({username})}
                                placeholder="Email"
                                placeholderTextColor='rgba(255, 255, 255, 0.8)'
                                selectionColor="white"
                                keyboardType="email-address"
                                value={this.state.username}
                                returnKeyType={"next"}
                                onSubmitEditing={(event) => {
                                    this.refs.Password.focus();
                                }}
                            />
                        </View>

                        {/*Divider between email text field and password text field*/}
                        <View style={styles.divider}/>

                        {/*Password text field*/}
                        <View style={{flexDirection: 'row', marginTop: 2}}>
                            <Image source={require('../Icons/Login/lock.png')}
                                   style={styles.passwordField}>
                            </Image>
                            <TextInput
                                ref='Password'
                                secureTextEntry={true}
                                style={styles.credentials}
                                onChangeText={password => this.setState({password})}
                                placeholder="Password"
                                placeholderTextColor='rgba(255, 255, 255, 0.8)'
                                selectionColor="white"
                                value={this.state.password}
                                onSubmitEditing={(event) => {
                                    this.signup(this.state.username, this.state.password)
                                }}
                            />
                        </View>

                        {/*Divider between password text field and login button*/}
                        <View style={styles.divider}/>


                        {/*Signup button*/}
                        <View style={{marginTop: 15}}>
                            <TouchableHighlight underlayColor="transparent"
                                                onPress={() => this.signup(this.state.username, this.state.password)}>
                                <Image source={require('../Icons/Signup/signup_button.png')}
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

AppRegistry.registerComponent('Signup', () => Signup);
