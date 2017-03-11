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
} from 'react-native';
import { NavBar } from './components/navBar';

const NAVBAR_TEXT = 'Combo Keeper';
const { height, width } = Dimensions.get('window');
const receivedJSON = [];

export default class ComboKeeper extends Component {

  constructor(props) {
    super(props);
    const locations = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    this.state = {
      bounceValue: new Animated.Value(0),
    };
  }

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} rightButton={'Save'} />
        <View style={styles.mainContent}>
          <Text style={styles.inputLabel}>Hinman Box Number</Text>
          <TextInput
            style={styles.smallInput}
            placeholder="i.e. HB 0000"
            onChangeText={text => this.setState({ text })}
          />
          <Text style={styles.inputLabel}>Hinman Box Combination</Text>
          <TextInput
            style={styles.smallInput}
            placeholder="i.e. Z-Z"
            onChangeText={text => this.setState({ text })}
          />
          <Text style={styles.inputLabel}>Canvas Password</Text>
          <TextInput
            style={styles.smallInput}
            placeholder="i.e. password123"
            onChangeText={text => this.setState({ text })}
          />
          <Text style={styles.inputLabel}>Other Services</Text>
          <TextInput
            style={styles.largeInput}
            placeholder="Type here to translate!"
            multiline
            onChangeText={text => this.setState({ text })}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the enter page */
  pageContent: {
    flex: 1,
  },

  /* Styles the back button */
  backIcon: {
    flex: 0,
    height: 20,
    resizeMode: 'center',
  },

  /* Style for the main section that will hold all the of the content */
  mainContent: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1,
  },

  /* Style for the input labels above each section */
  inputLabel: {
    fontSize: 16,
    textAlign: 'left',
    marginLeft: width / 15,
    marginTop: 10,
    marginBottom: 10,
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
    marginBottom: 10,
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
    marginTop: 10,
  },
});

AppRegistry.registerComponent('ComboKeeper', () => ComboKeeper);
