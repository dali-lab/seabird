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
  TextInput
} from 'react-native';
import { NavBar } from './../components/navBar';

const NAVBAR_TEXT = 'Combo Keeper';
const { height, width, } = Dimensions.get( 'window' );
const receivedJSON = [ ];

export default class ComboKeeper extends Component {

  constructor( props ) {
    super( props );
    const locations = new ListView.DataSource({
      rowHasChanged: ( row1, row2 ) => row1 !== row2
    });
    this.state = {
      bounceValue: new Animated.Value( 0 ),
      numberText: '',
      comboText: '',
      passwordText: '',
      otherText: ''
    };
  }

  saveCombos = ( number, combination, password, other ) => {
    // Save the combos to the database
  }

  render( ) {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} rightButton={'Save'} rightButtonFunction={() => this.saveCombos( this.state.numberText, this.state.comboText, this.state.passwordText, this.state.otherText )}/>
        <View style={styles.mainContent}>
          <Text style={styles.inputLabel}>Hinman Box Number</Text>
          <TextInput style={styles.smallInput} placeholder="i.e. HB 0000" selectionColor="#058e4b" onChangeText={numberText => this.setState({ numberText })}/>
          <Text style={styles.inputLabel}>Hinman Box Combination</Text>
          <TextInput style={styles.smallInput} placeholder="i.e. Z-Z" selectionColor="#058e4b" onChangeText={comboText => this.setState({ comboText })}/>
          <Text style={styles.inputLabel}>Canvas Password</Text>
          <TextInput style={styles.smallInput} placeholder="i.e. password123" selectionColor="#058e4b" onChangeText={passwordText => this.setState({ passwordText })}/>
          <Text style={styles.inputLabel}>Other Services</Text>
          <TextInput style={styles.largeInput} placeholder="" selectionColor="#058e4b" multiline onChangeText={otherText => this.setState({ otherText })}/>
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
  }
});

AppRegistry.registerComponent( 'ComboKeeper', ( ) => ComboKeeper );
