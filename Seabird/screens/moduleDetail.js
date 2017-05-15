import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  Animated,
  ListView,
} from 'react-native';

import { NavBar } from './../components/navBar';
import { CustomList } from './../components/customList';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';
import LinearGradient from 'react-native-linear-gradient';
const COLOR1 = '#00713A'; // used for 3/6 buttons and the Next button (NOTE: original color)
const COLOR2 = '#01964d'; // used for the other 3/6 buttons
const { height, width } = Dimensions.get('window');
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class ModuleDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    };
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.mainHeader}>
          <NavBar navigator={this.props.navigator} text="Seabird University" />
        </View>
        <CustomList dataSourceIdentifier="moduleDirectories/academics" navigator={this.props.navigator} updateViewName={this.props.updateViewName}
        updateViewURL={this.props.updateViewURL}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('ModuleDetails', () => ModuleDetails);
