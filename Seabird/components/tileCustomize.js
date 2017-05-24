import React, { Component } from 'react';
import {
  TouchableHighlight,
  Image,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('window');
let TILE_COLOR = '#188E65';

export class TileCustomize extends Component {

  render() {
    return (
      <View>
        <View style={this.props.tileStyle}>
          <Image source={this.props.imgSource} style={styles.icon} />
        </View>
        <View style={styles.textHolder}>
          <Text style={this.props.textStyle}>{this.props.text.toUpperCase()}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the icons on the main buttons */
  icon: {
    top: 10,
    width: width / 5,
    height: width / 5,
    opacity: 1,
    tintColor: TILE_COLOR,
  },

    /* Style for the main label holder */
  textHolder: {
    marginTop: 0,
    backgroundColor: 'transparent',
  },
});
