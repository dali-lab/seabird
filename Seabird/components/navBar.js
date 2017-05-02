import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableHighlight,
    Image,
} from 'react-native';
import { BackButton } from './backButton';
import { HomeButton } from './homeButton';

// This is a navigation bar containing two buttons on either side, and text in the center.
const { width } = Dimensions.get('window');

export class NavBar extends Component {

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({ name: routeName, transitionType });
}

    render() {
        if (this.props.rightButton === "True") {
            return (
                <View style={styles.rootHeader}>
                  <TouchableHighlight underlayColor="transparent" onPress={this.navigate.bind(this, 'settings', 'down')}>
                    <Image source={require('./../Icons/User-Menu-Male-48.png')}  />
                  </TouchableHighlight>
                  <Text style={styles.schoolTitle}>{this.props.schoolTitle}</Text>
                  <TouchableHighlight underlayColor="transparent" onPress={this.navigate.bind(this, 'customize', 'down')}>
                    <Image source={require('./../Icons/Settings-48.png')} style={styles.settingsIcon} />
                  </TouchableHighlight>
                </View>
            );
        }
      return (
        <View style={styles.mainHeader}>
          <BackButton navigator={this.props.navigator} type={this.props.type} />
          <Text> {this.props.text} </Text>
          <HomeButton navigator={this.props.navigator}/>
        </View>
      );
    }
    }

const styles = StyleSheet.create({
  /* Style for the header section that holds the school name and crest */
    rootHeader: {
        width,
        height: 60,
        backgroundColor: '#00713A',
        flexDirection: 'row',
        paddingTop: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    mainHeader: {
        width,
        height: 60,
        backgroundColor: '#00713A',
        paddingTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',

    }
});
