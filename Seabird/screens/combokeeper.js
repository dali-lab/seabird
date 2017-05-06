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
  ReactPropTypes,
  TextInput,
  ScrollView,
} from 'react-native';
import { NavBar } from './../components/navBar';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

const NAVBAR_TEXT = 'Combo Keeper';
const { height, width, } = Dimensions.get( 'window' );
const receivedJSON = [ ];

let _scrollView: ScrollView;

export default class ComboKeeper extends Component {

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
    Database.listenUserCombos((value) => {
      if (value != null && value != undefined) {
        var combos = JSON.parse(value)
        this.setState({firstSlot: combos[0].firstSlot})
        this.setState({secondSlot: combos[1].secondSlot})
        this.setState({thirdSlot: combos[2].thirdSlot})
        this.setState({otherServices: combos[3].otherServices})
      }
    })
  }

  saveCombos = (combos) => {
    var userCombos = [
      {firstSlot: combos[0]},
      {secondSlot: combos[1]},
      {thirdSlot: combos[2]},
      {otherServices: combos[3]},
    ]
    Database.setUserCombos(JSON.stringify(userCombos))
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
          <Text style={styles.inputLabel}>Hinman Box Number</Text>
          <TextInput
            style={styles.smallInput}
            placeholder="i.e. HB 0000"
            selectionColor="#058e4b"
            onChangeText={firstSlot => this.setState({ firstSlot })}
            onFocus={() => _scrollView.scrollTo({y: 100})}
            onEndEditing={() => _scrollView.scrollTo({y: 0})}
          />
          <Text style={styles.inputLabel}>Hinman Box Combination</Text>
          <TextInput
            style={styles.smallInput}
            placeholder="i.e. Z-Z"
            selectionColor="#058e4b"
            onChangeText={secondSlot => this.setState({ secondSlot })}
            onFocus={() => _scrollView.scrollTo({y: 100})}
            onEndEditing={() => _scrollView.scrollTo({y: 0})}
          />
          <Text style={styles.inputLabel}>Canvas Password</Text>
          <TextInput
            style={styles.smallInput}
            placeholder="i.e. password123"
            selectionColor="#058e4b"
            onChangeText={thirdSlot => this.setState({ thirdSlot })}
            onFocus={() => _scrollView.scrollTo({y: 150})}
            onEndEditing={() => _scrollView.scrollTo({y: 0})}
          />
          <Text style={styles.inputLabel}>Other Services</Text>
          <TextInput
            style={styles.largeInput}
            placeholder=""
            selectionColor="#058e4b"
            multiline onChangeText={otherServices => this.setState({ otherServices })}
            onFocus={() => _scrollView.scrollTo({y: height / 3})}
            onEndEditing={() => _scrollView.scrollTo({y: 0})}
          />
          <TouchableHighlight style={styles.saveButton} onPress={() => this.saveCombos([this.state.firstSlot, this.state.secondSlot, this.state.thirdSlot, this.state.otherServices])}>
            <Text style={styles.saveButtonText}>SAVE</Text>
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
    flex: 1
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

  /* Style for the input labels above each section */
  inputLabel: {
    fontSize: 16,
    textAlign: 'left',
    marginLeft: width / 15,
    marginTop: 10,
    marginBottom: 10
  },

  /* Style for the smaller text input area */
  smallInput: {
    height: height / 15,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: width / 15,
    marginLeft: width / 15,
    marginBottom: 10
  },

  /* Style for the smaller text input area */
  largeInput: {
    height: height / 3,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#d6d6d6',
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: width / 15,
    marginLeft: width / 15,
    marginTop: 10
  },

  /* Style for the save button */
  saveButton: {
    height: 40,
    width: width / 3,
    alignSelf: 'flex-end',
    borderRadius: 3,
    backgroundColor: '#00713A',
  },

  /* Style for the save button text */
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Arial',
    paddingTop: 10,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent( 'ComboKeeper', ( ) => ComboKeeper );
