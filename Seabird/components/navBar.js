import React, { Component } from 'react';
import { TouchableHighlight, Image, StyleSheet, Text, View } from 'react-native';
import { BackButton } from './backButton';

export class NavBar extends Component {

  navigatePop() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.mainHeader}>
        <BackButton navigator={this.props.navigator} />
        <Text style={styles.schoolTitle}>{this.props.text}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  /* Style for the header section that holds the school name and crest */
  mainHeader: {
    width: 400,
    height: 70,
    marginBottom: 20,
    backgroundColor: '#2b2b2b',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  /* Style for the school title text */
  schoolTitle: {
    fontSize: 23,
    fontFamily: 'System',
    fontWeight: '300',
    color: '#fff',
    letterSpacing: -0.56,
  },
});