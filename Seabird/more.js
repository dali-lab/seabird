import React, { Component } from 'react';
import { Image, Animated, StyleSheet, LinkingIOS, ScrollView, ListView, View, Text, Navigator, AppRegistry, PropTypes, TouchableHighlight, WebView, TouchableOpacity } from 'react-native';

export default class More extends Component {
  // Initialize the hardcoded data

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    }
  };

  navigatePop(routeName) {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.mainHeader}>
      <TouchableHighlight onPress={this.navigatePop.bind(this, 'more')}>
        <Image
          source={require('./Icons/Back-50-White.png')}
          style={styles.backIcon}
        />
        </TouchableHighlight>
        <Text style={styles.schoolTitle}>More Modules</Text>
      </View>
      <ScrollView>
      </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  /* Styles the entire container to hold multiple views */
  container: {
      flex: 1,
    },

  /* Style for the header section that holds the school name and crest */
  mainHeader: {
    width: 400,
    height: 70,
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

  /* Styles the back button */
  backIcon: {
    flex: 0,
    height: 20,
    resizeMode: 'center',
  },
});

AppRegistry.registerComponent('More', () => More);
