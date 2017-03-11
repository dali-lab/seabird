import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { BackButton } from './backButton';

const { width } = Dimensions.get('window');

export class NavBar extends Component {

  navigatePop() {
    this.props.navigator.pop();
  }

  render() {
    if (this.props.rightButton != null) {
      console.log('what');
      return (
        <View style={styles.mainHeader}>
          <BackButton navigator={this.props.navigator} type={this.props.type} />
          <Text style={styles.schoolTitle}>{this.props.text}</Text>
          <Text style={styles.schoolTitle}>{this.props.rightButton}</Text>
        </View>

      );
    }
    return (
      <View style={styles.mainHeader}>
        <BackButton navigator={this.props.navigator} type={this.props.type} />
        <Text style={styles.schoolTitle}>{this.props.text}</Text>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  /* Style for the header section that holds the school name and crest */
  mainHeader: {
    width,
    height: 60,
    backgroundColor: '#00713A',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  /* Style for the school title text */
  schoolTitle: {
    fontSize: 23,
    fontFamily: 'System',
    fontWeight: '300',
    color: '#fff',
    letterSpacing: -0.56,
    textAlign: 'center',
    flex: 2,
    marginRight: 50,
  },
});
