import React, { Component } from 'react';
import { TouchableHighlight, Image, StyleSheet, Text, View } from 'react-native';

export class Tile extends Component {

  navigatePop() {
    this.props.navigator.pop();
  }

  navigate(routeName, transitionType='normal') {
    this.props.navigator.push({
      name: routeName,
      transitionType: transitionType
    })
  }

  render() {
    return (
      <TouchableHighlight onPress={this.navigate.bind(this, this.props.navName)}>
        <View style={this.props.style}>
          <Image
            source={this.props.imgSource}
            style={styles.mainIcon}
          />
          <View style={styles.mainLabelHolder}>
            <Text style={styles.mainLabel}>{this.props.text}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  /* Style for the icons on the main buttons */
  mainIcon: {
    top: 10,
  },

  /* Style for the main label holder */
  mainLabelHolder: {
    top: 40,
    width: 150,
    height: 45,
  },

  /* Style for the main label texts on the main buttons */
  mainLabel: {
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
    paddingTop: 10,
  },

});
