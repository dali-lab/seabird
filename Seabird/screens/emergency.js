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
          <TouchableHighlight onPress={() => Linking.openURL('https://dali.dartmouth.edu')}>
              <Text>Open the DALI website externally</Text>
          </TouchableHighlight>
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
