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
export class TileCustomize extends Component {

  render() {
    return (
      <TouchableHighlight underlayColor="rgba(0, 0, 0, 0)">
        <View>
          <View style={this.props.tileStyle}>
            <Image source={this.props.imgSource} style={styles.icon} />
          </View>
          <View style={this.props.tileTextSection}>
            <Text style={this.props.textStyle}>{this.props.text.toUpperCase()}</Text>
          </View>
        </View>
      </TouchableHighlight>
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
  },

    /* Style for the main label holder */
  textHolder: {
    top: 40,
    height: 45,
  },
});
