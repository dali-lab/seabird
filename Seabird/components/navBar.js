import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { BackButton } from './backButton';

const { width } = Dimensions.get('window');

export class NavBar extends Component {

  navigatePop() {
    this.props.navigator.pop();
  }

  render() {
    if (this.props.rightButton != null) {
      return (
        <View style={styles.mainHeader}>
          <View style={{ flex: 6 }}>
            <BackButton navigator={this.props.navigator} type={this.props.type} />
          </View>
          <View style={{ flex: 1, marginTop: 15 }}>
            <Text style={styles.schoolTitle}>{this.props.text}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableHighlight underlayColor="transparent" onPress={this.props.rightButtonFunction}>
              <Text style={styles.schoolTitleThird}>{this.props.rightButton}</Text>
            </TouchableHighlight>
          </View>
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
    justifyContent: 'flex-end',
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

  /* Second style for the school title text */
  schoolTitleSecond: {
    fontSize: 23,
    fontFamily: 'System',
    fontWeight: '300',
    color: '#fff',
    letterSpacing: -0.56,
    textAlign: 'center',
    flex: 3,
    marginRight: 50,
  },

  /* Third style for the school title text */
  schoolTitleThird: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: '300',
    color: '#fff',
    letterSpacing: -0.56,
  },
});
