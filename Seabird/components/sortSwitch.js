import React, { Component } from 'react';
import {
  TouchableHighlight,
  Image,
  Text,
  View,
  ListView,
  StyleSheet,
  Dimensions,
  PixelRatio
} from 'react-native';

import { Tile } from './tile';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';
const { height, width } = Dimensions.get('window');

let MODULE_FONT_SIZE = 18;
let MODULE_TEXT_PADDING = 0;
let TILE_WIDTH = width / 3.3
let TILE_HEIGHT = height / 6


if (PixelRatio.get() <= 2) {
  MODULE_FONT_SIZE = 15;
  MODULE_TEXT_PADDING = -2;
  TILE_WIDTH = width / 3.6
  TILE_HEIGHT = height / 6.5
}

export class SortSwitch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstPressStatus: true,
      secondPressStatus: false,
    };
  }

  // Handles onPress for the first button
  // Call action functions here
  firstToggleButton(){
    if (!this.state.firstPressStatus) {
      this.setState({ firstPressStatus: !this.state.firstPressStatus });
      this.setState({ secondPressStatus: !this.state.secondPressStatus });
      if (this.props.firstAction) {
        this.props.firstAction()
      }
    }
  }

  // Handles onPress for the second button
  // Call action functions here
  secondToggleButton(){
    if (!this.state.secondPressStatus) {
      this.setState({ firstPressStatus: !this.state.firstPressStatus });
      this.setState({ secondPressStatus: !this.state.secondPressStatus });
      if (this.props.secondAction) {
        this.props.secondAction()
      }
    }
  }

  render() {
    return (
      <View style={styles.basicFlexAround}>
        <View style={styles.basicFlexBetween}>
          <Text style={styles.optionText}>{this.props.title}</Text>
          <View style={styles.basicFlexBetweenOptions}>
            <TouchableHighlight underlayColor="transparent" style={this.state.firstPressStatus ? styles.selectedOption : styles.deselectedOption}
            onPress={this.firstToggleButton.bind(this)}>
              <Text style={this.state.firstPressStatus  ? styles.selectedOptionText : styles.deselectedOptionText}>{this.props.firstOption}</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="transparent" style={this.state.secondPressStatus ? styles.selectedOption : styles.deselectedOption}
            onPress={this.secondToggleButton.bind(this)}>
              <Text style={this.state.secondPressStatus ? styles.selectedOptionText : styles.deselectedOptionText}>{this.props.secondOption}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the title above the list */
  listContentHeader: {
    fontFamily: 'Arial',
    fontSize: 26,
    fontWeight: 'bold',
    color: 'rgb(113, 207, 119)',
    margin: 15,
  },

  /* Style for the divider */
  divider: {
    width: 1,
    height: 25,
  },

  /* Style for the selected option */
  selectedOption: {
    height: 25,
    width: width / 6.5,
    backgroundColor: 'rgb(92, 201, 140)',
  },

  /* Style for the deselected option */
  deselectedOption: {
    height: 20,
    width: width / 6.3,
    backgroundColor: 'transparent',
  },

  /* Style for the selected option text */
  selectedOptionText: {
    paddingTop: 5,
    fontSize: 11,
    textAlign: 'center',
    color: '#444',
    fontFamily: 'Lato',
  },

  /* Style for the deselected option text */
  deselectedOptionText: {
    paddingTop: 5,
    fontSize: 11,
    textAlign: 'center',
    color: '#444',
    fontFamily: 'Lato',
  },

  /* Style for the text next to the switches */
  optionText: {
    paddingTop: 5,
    fontSize: 14,
    marginRight: 10,
    textAlign: 'center',
  },

  /* Basic flex for options - between */
  basicFlexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  /* Basic flex for options - between */
  basicFlexBetweenOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#333',
  },

  /* Basic flex for options - around */
  basicFlexAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
})
