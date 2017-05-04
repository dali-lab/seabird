import React, { Component } from 'react';
import {
  TouchableHighlight,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export class Tile extends Component {

  navigate(routeName, transitionType = 'normal') {
    console.log(routeName);
    this.props.navigator.push({ name: routeName, transitionType });
  }

  render() {
    return (
      <TouchableHighlight onPress={this.navigate.bind(this, this.props.navName)} underlayColor="rgba(0, 0, 0, 0)">
        <View style={this.props.tileStyle}>
          <Image source={this.props.imgSource} style={styles.icon} />
          <Text style={this.props.textStyle}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
    /* Style for the icons on the main buttons */
  icon: {
    top: 10,
    opacity: 1,
  },

    /* Style for the main label holder */
  textHolder: {
    top: 40,
    height: 45,
  },
});
