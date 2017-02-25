import React, { Component } from 'react';
import {
  TouchableHighlight,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

const { height, width } = Dimensions.get('window');

export class Tile extends Component {

  navigatePop() {
    this.props.navigator.pop();
  }

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({
      name: routeName,
      transitionType: transitionType,
    });
  }

  render() {
    return (
      <TouchableHighlight onPress={this.navigate.bind(this, this.props.navName)}>
        <View style={this.props.tileStyle}>
          <Image
            source={this.props.imgSource}
            style={styles.icon}
          />
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
  },

  /* Style for the main label holder */
  textHolder: {
    top: 40,
    height: 45,
  },

  /* Style for the main label texts on the main buttons */
  tileText: {
    top: 40,
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
  },

});
