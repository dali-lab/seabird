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

        <TouchableOpacity onPress={() => Communications.phonecall('6316554692', true)}>
            <View style={styles.holder}>
                <Text style={styles.text}>Make phonecall</Text>
            </View>
        </TouchableOpacity>

          <Text style={styles.headerText}>Safety and Security</Text>

          <Text style={styles.subheaderText}>good sam (non-emergency)</Text>

          <TouchableOpacity onPress={
              () => Communications.phonecall('6316554692', true)
            }><Text style={styles.phoneNumberText}>(603) 646-4000</Text>
          </TouchableOpacity>

          <Text style={styles.subheaderText}>emergency</Text>
          <TouchableOpacity onPress={
              () => Communications.phonecall('6316554692', true)
            }><Text style={styles.phoneNumberText}>(603) 646-4000</Text>
          </TouchableOpacity>

          <Text style={styles.headerText}>Dicks House</Text>
          <Text style={styles.subheaderText}>appointments</Text>
          <TouchableOpacity onPress={
              () => Communications.phonecall('6316554692', true)
            }><Text style={styles.phoneNumberText}>(603) 646-4000</Text>
          </TouchableOpacity>

          <Text style={styles.subheaderText}>counseling</Text>
          <TouchableOpacity onPress={
              () => Communications.phonecall('6316554692', true)
            }><Text style={styles.phoneNumberText}>(603) 646-4000</Text>
          </TouchableOpacity>

          <Text style={styles.headerText}>Residential Life</Text>
          <TouchableOpacity onPress={
              () => Communications.phonecall('6316554692', true)
            }><Text style={styles.phoneNumberText}>(603) 646-4000</Text>
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
    fontSize: 18,
    fontFamily: 'Avenir Next',
    textAlign: 'left'
  },

  /* Style for the subheader phrases */
  subheaderText: {
    paddingLeft: width / 18,
    fontSize: 14,
    fontFamily: 'Avenir Next',
    textAlign: 'left'
  },

  /* Style for the phone numbers TouchableOpacitysr */
  phoneNumberText: {
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
