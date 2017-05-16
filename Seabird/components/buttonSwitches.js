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

export class ButtonSwitches extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstPressStatus: true,
      secondPressStatus: false,
    };
  }

  firstToggleButton(){
    if (!this.state.firstPressStatus) {
      this.setState({ firstPressStatus: !this.state.firstPressStatus });
      this.setState({ secondPressStatus: !this.state.secondPressStatus });
    }
  }

  secondToggleButton(){
    if (!this.state.secondPressStatus) {
      this.setState({ firstPressStatus: !this.state.firstPressStatus });
      this.setState({ secondPressStatus: !this.state.secondPressStatus });
    }
  }

  render() {
    return (
      <View style={styles.basicFlexAround}>
        <View style={styles.basicFlexBetween}>
          <View style={styles.basicFlexBetweenOptions}>
            <TouchableHighlight underlayColor="transparent" style={this.state.firstPressStatus ? styles.selectedOption : styles.deselectedOption}
            onPress={this.firstToggleButton.bind(this)}>
              <Text style={this.state.firstPressStatus ? styles.selectedOptionText : styles.deselectedOptionText}>{this.props.first}</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="transparent" style={this.state.secondPressStatus ? styles.selectedOption : styles.deselectedOption}
            onPress={this.secondToggleButton.bind(this)}>
              <Text style={this.state.secondPressStatus ? styles.selectedOptionText : styles.deselectedOptionText}>{this.props.second}</Text>
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

  /* Style for the selected option */
  selectedOption: {
    height: 30,
    width: width / 3.5,
    backgroundColor: '#147863',
  },

  /* Style for the deselected option */
  deselectedOption: {
    height: 30,
    width: width / 3.5,
    backgroundColor: '#fff',
  },

  /* Style for the selected option text */
  selectedOptionText: {
    paddingTop: 5,
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
  },

  /* Style for the deselected option text */
  deselectedOptionText: {
    paddingTop: 5,
    fontSize: 14,
    textAlign: 'center',
    color: '#147863'
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
    borderColor: '#147863',
  },

  /* Basic flex for options - around */
  basicFlexAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
})
