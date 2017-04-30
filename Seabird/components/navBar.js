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

// This is a navigation bar containing two buttons on either side, and text in the center.
const { width } = Dimensions.get('window');

export class NavBar extends Component {

    navigate(routeName, transitionType = 'normal') {
        this.props.navigator.push({ name: routeName, transitionType });
    }

    render() {
        if (this.props.rightButton === "True") {
            return (
                <View style={styles.twoButtonHeader}>
                  <TouchableHighlight underlayColor="transparent" onPress={this.navigate.bind(this, 'settings', 'down')}>
                    <Image source={require('./../Icons/User-Menu-Male-48.png')} style={styles.settingsIcon} />
                  </TouchableHighlight>
                  <Text style={styles.schoolTitle}>{this.props.schoolTitle}</Text>
                  <TouchableHighlight underlayColor="transparent" onPress={this.navigate.bind(this, 'customize', 'down')}>
                    <Image source={require('./../Icons/Settings-48.png')} style={styles.settingsIcon} />
                  </TouchableHighlight>
                </View>
            );
        }
        else {
            return (
                <View style={styles.oneButtonHeader}>
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
    }
}

const styles = StyleSheet.create({
  /* Style for the header section that holds the school name and crest */
    twoButtonHeader: {
        width,
        height: 60,
        backgroundColor: '#00713A',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    oneButtonHeader: {
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
