import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  Animated,
  ListView,
} from 'react-native';

import { NavBar } from './../components/navBar';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';
import LinearGradient from 'react-native-linear-gradient';
const COLOR1 = '#00713A'; // used for 3/6 buttons and the Next button (NOTE: original color)
const COLOR2 = '#01964d'; // used for the other 3/6 buttons
const { height, width } = Dimensions.get('window');
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class ModuleDetails extends Component {

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({ name: routeName, transitionType, });
  }

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => true,
      }),
    };
  }

  componentWillMount() {
    /* Going to the path /content/moduleDirectories/academics/ to get all the modules */
    Database.listenSchoolModuleDirectories("academics", (value) => {
        this.setState({ dataSource: new ListView.DataSource({
          rowHasChanged: (r1, r2) => true,
        }).cloneWithRows(value),
      })
    })
  }

  renderRow = (rowData, sectionID, rowID) => {
    return (
      <View>
      <TouchableHighlight underlayColor="transparent" onPress={() => this.navigate(rowData)}>
      <View style={styles.rowSection}>
        <Text style={styles.sectionText}>{rowData}</Text>
        <Image source={require('./../Icons/list_view_right_arrow.png')} style={styles.sectionButton}/>
        {/*<View key={rowID} style={styles.separator} />*/}
      </View>
      </TouchableHighlight>
      <View key={rowID} style={styles.separator} />
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.mainHeader}>
          <NavBar navigator={this.props.navigator} text="Seabird University" />
        </View>
        <ListView
          scrollEnabled={false}
          style={styles.section}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the header section that holds the school name and crest */
  mainHeader: {
    width,
    height: 60,
    marginBottom: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  /* Style for the section of the list view */
  rowSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },

  /* Style for the text of the section of the list view */
  sectionText: {
    paddingLeft: width / 12,
    fontSize: 25,
    fontFamily: 'Avenir',
    color: '#136B3D',
    marginTop: 15,
  },

  /* Style for the section separators */
  separator: {
    width: width / 1.1,
    height: 1,
    alignSelf: 'flex-end',
    backgroundColor: '#CFE0D8',
  },

  /* Style for the section's button */
  sectionButton: {
    flex: 0,
    height: 20,
    marginRight: 15,
    marginTop: 20,
  },

});

AppRegistry.registerComponent('ModuleDetails', () => ModuleDetails);
