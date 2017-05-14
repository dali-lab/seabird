import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
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
          <Text>All texts after this one are *functional*, clickable buttons</Text>
          <Text>~~~</Text>

          <TouchableHighlight onPress={() => Linking.openURL('https://dali.dartmouth.edu')}>
              <Text>Open the DALI website externally</Text>
          </TouchableHighlight>

          <Text>~~~</Text>

          <TouchableHighlight onPress={() => Communications.web('https://dali.dartmouth.edu')}>
              <Text>Another way to open the site externally</Text>
          </TouchableHighlight>

          <Text>~~~</Text>

          <TouchableHighlight onPress={() => Communications.phonecall('6316554692', true)}>
              <Text>This one makes a phonecall, but only works on device</Text>
          </TouchableHighlight>

          <Text>~~~</Text>

          <TouchableHighlight onPress={() => Communications.textWithoutEncoding('5555648583', "hey")}>
              <Text>Send a text to "Kate" (on simulator, not device)</Text>
          </TouchableHighlight>

          <Text>~~~</Text>

          <TouchableHighlight onPress={() => Communications.email(null, null, null, null, null)}>
              <Text>Send an email (again, only on device)</Text>
          </TouchableHighlight>

          <Text>~~~</Text>
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

  /* Style for the main section that will hold all the of the content */
  mainContent: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1
},
});

AppRegistry.registerComponent( 'Emergency', ( ) => emergency );
