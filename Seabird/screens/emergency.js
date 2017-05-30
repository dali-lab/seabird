import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ListView,
  Animated,
  AsyncStorage,
  Modal,
  Button,
  ReactPropTypes,
  TextInput,
  ScrollView,
  Linking,
} from 'react-native';
import { NavBar } from './../components/navBar';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';
import Communications from 'react-native-communications';

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

const NAVBAR_TEXT = 'Emergency';
const { height, width, } = Dimensions.get( 'window' );
const receivedJSON = [ ];

let _scrollView: ScrollView;

export default class Emergency extends Component {

  constructor( props ) {
    super( props );
    const locations = new ListView.DataSource({
      rowHasChanged: ( row1, row2 ) => row1 !== row2
    });
    this.state = {
      bounceValue: new Animated.Value( 0 ),
      firstSlot: '',
      secondSlot: '',
      thirdSlot: '',
      otherServices: ''
    };
  }

  componentWillMount() {
  }

  scrollScreen = (yVal) => {
    _scrollView.scrollTo({y: yVal});
  }

  render( ) {
    return (
      <View style={styles.pageContent}>
        <NavBar
          navigator={this.props.navigator}
          text={NAVBAR_TEXT} rightButton={'Save'}
        />
        <View style={styles.mainContent}>
        <ScrollView ref={(scrollView) => { _scrollView = scrollView; }}>

          <Text style={styles.headerText}>Safety and Security</Text>
          <TouchableOpacity onPress={
              () => Communications.phonecall('6036464000', true)
            } style={styles.callButtonGreen}><Text style={styles.phoneNumberText}>Good Sam</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={
              () => Communications.phonecall('6036464000', true)
            } style={styles.callButtonRed}><Text style={styles.phoneNumberText}>Emergency</Text>
          </TouchableOpacity>

          <Text style={styles.headerText}>Dicks House</Text>
          <TouchableOpacity onPress={
              () => Communications.phonecall('6036464000', true)
            } style={styles.callButtonGreen}><Text style={styles.phoneNumberText}>Appointments</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={
              () => Communications.phonecall('6036464000', true)
            } style={styles.callButtonGreen}><Text style={styles.phoneNumberText}>Counseling</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={
              () => Communications.phonecall('6036464000', true)
            } style={styles.callButtonGreen}><Text style={styles.phoneNumberText}>Res Life</Text>
          </TouchableOpacity>

        </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the enter page */
  pageContent: {
    flex: 1,
    backgroundColor: 'white',
  },

  /* Styles the back button */
  backIcon: {
    flex: 0,
    height: 20,
    resizeMode: 'center'
  },

  /* Style for the header phrases */
  headerText: {
    paddingLeft: width / 27,
    fontSize: 22,
    fontFamily: 'Lato',
    textAlign: 'left',
    color: 'rgba(7, 128, 75, 1)',
    marginTop: 10,
  },

  /* Style for the subheader phrases */
  subheaderText: {
    paddingLeft: width / 18,
    fontSize: 18,
    fontFamily: 'Lato',
    textAlign: 'left'
  },

  /* Style for the call button that is green */
  callButtonGreen: {
    backgroundColor: 'rgba(7, 128, 75, 1)',
    height: 40,
    width: width / 2,
    alignSelf: 'center',
    marginTop: 15,
  },

  /* Style for the call button that is red */
  callButtonRed: {
    backgroundColor: 'rgba(213, 35, 35, 1)',
    height: 40,
    width: width / 2,
    alignSelf: 'center',
    marginTop: 15,
  },

  /* Style for the phone numbers TouchableOpacitysr */
  phoneNumberText: {
    color: 'white',
    fontFamily: 'Lato',
    marginTop: 7,
    fontSize: 16,
    textAlign: 'center',
  },

  /* Style for the MAIN section with all the CONTENT */
  mainContent: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1
},
});

AppRegistry.registerComponent( 'Emergency', ( ) => emergency );
