import React, { Component } from 'react';
import { Image, Animated, StyleSheet, LinkingIOS, ScrollView, ListView, View, Text, Navigator, AppRegistry, PropTypes, TouchableHighlight, WebView } from 'react-native';
import { NavBar } from './components/navBar';

const ddsLocations = ['FOCO', 'THE HOP', 'NOVACK', 'COLLIS'];
const NAVBAR_TEXT = 'Food';


export default class DDS extends Component {
  // Initialize the hardcoded data

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid != r2.guid});
    this.state = {
      bounceValue: new Animated.Value(0),
      dataSource: dataSource.cloneWithRows(ddsLocations),
    }
  };

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor='#ddd' style={{height: 44}}>
        <View>
          <Text style={styles.listItem} numberOfLines={1}>{rowData}</Text>
          <View style={styles.divider}/>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
        <View style={styles.mainContent}>
          <View style={styles.contentHeader}>
            <Text style={styles.mealIntro}>The current swipe is</Text>
            <Text style={styles.currentSwipe}>BREAKFAST: $5.25</Text>
            <Text style={styles.menuOptions}>See full menus here</Text>
          </View>
          <View style={styles.contentInformation}>
            <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}>
            </ListView>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  /* Style for the enter page */
  pageContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  /* Styles the back button */
  backIcon: {
    flex: 0,
    height: 20,
    resizeMode: 'center',
  },

  /* Style for the main section that will hold all the of the DDS content */
  mainContent: {
    width: 350,
    height: 525,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    borderRadius: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  /* Style for the section that holds the swipe headers */
  contentHeader: {
    width: 325,
    height: 125,
    marginTop: 20,
  },

  /* Style for the intro phrase */
  mealIntro: {
    fontSize: 18,
    fontFamily: 'System',
    textAlign: 'center',
  },

  /* Style for the current meal swipe */
  currentSwipe: {
    fontSize: 28,
    fontFamily: 'System',
    fontWeight: '600',
    textAlign: 'center',
  },

  /* Style for the menu option */
  menuOptions: {
    fontSize: 12,
    fontFamily: 'System',
    textAlign: 'center',
    marginTop: 7,
  },

  contentInformation: {
    width: 250,
  },

  listItem: {
    fontSize: 22,
    fontFamily: 'System',
    fontWeight: '400',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },

  /* Style for the divider in the list */
  divider: {
    height: 1,
    backgroundColor: '#bbb',
  },

});

AppRegistry.registerComponent('DDS', () => DDS);
