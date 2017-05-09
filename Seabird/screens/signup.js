
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    TouchableHighlight,
    Modal,
    PixelRatio,
    Image
} from 'react-native';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';

const SCHOOL_NAME = 'Seabird University'; // used for the title bar (although this will eventually be an image)
const { height, width } = Dimensions.get('window');
let firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

let SCHOOL_FONT_SIZE = 32;

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
            this.setModalVisible(!this.state.modalVisible);
            console.log(e)
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

    userIsSignedIn = () => {
        console.log('USER IS ALREADY SIGNED IN');
        console.log(Firebase.getUser());
        this.props.navigator.push({name: 'root'});
    };

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
            <View style={styles.main}>
                <View>
                    <Image style={styles.headerIcon}  source={require('./../Icons/dartmouth_banner.png')} />
                </View>

                <View>
                    <Text style={styles.textStyle}>Sign Up</Text>
                </View>

                <View>
                    <TextInput
                        style={styles.credentials}
                        onChangeText={username => this.setState({ username })}
                        //onFocus={() => this.updateText('', this.state.password)}
                        autoFocus={true}
                        placeholder="Email"
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
                        placeholder="Password"
                        value={this.state.password}
                        onSubmitEditing={(event) => {
                            this.login(this.state.username, this.state.password)
                        }}
                    />

                    <View style={styles.divider} />
                </View>

                <View>
                    <TouchableHighlight style={styles.signupButton} onPress={() => this.signup(this.state.username, this.state.password)}>
                        <Text style={styles.buttonText}>SIGN UP</Text>
                    </TouchableHighlight>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    /* Style for the main component */
    main: {
      flex: 1,
      backgroundColor: 'white',
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

    /* Style for the divider that will be the underline area */
    divider: {
        height: 1,
        width: width / 1.6,
        backgroundColor: 'black'
    },

    /* Style for the Login button */
    signupButton: {
        height: 35,
        width: width / 1.6,
        backgroundColor: 'green',
        marginTop: height / 15,
        borderRadius: 5,
    },

    /* Style for the login button text */
    buttonText: {
        textAlign: 'center',
        marginTop: 8,
        letterSpacing: 1,
        fontWeight: '500',
    },

    main: {
        backgroundColor: '#ddd',
        flex: 1,
        alignItems: 'center',
    },

    headerIcon: {
        resizeMode: 'contain',
        width: width,
        height: 100,
    },

    textStyle: {
        fontSize: 18,
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
    },
});

AppRegistry.registerComponent('Signup', () => Signup);
