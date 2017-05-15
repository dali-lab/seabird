import React, { Component } from 'react';
import {
  TouchableHighlight,
  Image,
  Text,
  View,
  ListView,
  StyleSheet,
  Dimensions,
  PixelRatio
} from 'react-native';

import Firebase from './../firebase/firebase';
import Database from './../firebase/database';
const { height, width } = Dimensions.get('window');

let MODULE_FONT_SIZE = 18;
let MODULE_TEXT_PADDING = 0;
let TILE_WIDTH = width / 3.3
let TILE_HEIGHT = height / 6


if (PixelRatio.get() <= 2) {
  MODULE_FONT_SIZE = 15;
  MODULE_TEXT_PADDING = -2;
  TILE_WIDTH = width / 3.6
  TILE_HEIGHT = height / 6.5
}

export class CustomList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => true,
      }),
    };
  }

  navigate(url, routeName, transitionType = 'normal') {
    this.props.updateViewName(routeName);
    this.props.updateViewURL(url);
    this.props.navigator.push({ name: routeName, transitionType, });
  }

  componentWillMount() {
    /* Going to the path /content/moduleDirectories/academics/ to get all the modules */
    Database.listenContent(this.props.dataSourceIdentifier, (value) => {
      console.log(value);
        this.setState({ dataSource: new ListView.DataSource({
          rowHasChanged: (r1, r2) => true,
        }).cloneWithRows(value),
      })
    })
  }

  renderRow = (rowData, sectionID, rowID) => {
    return (
      <View>
      <TouchableHighlight underlayColor="transparent" onPress={() => this.navigate(rowData.url, "appwebview")}>
      <View style={styles.rowSection}>
        <Text style={styles.sectionText}>{rowData.navName}</Text>
        <Image source={require('./../Icons/list_view_right_arrow.png')} style={styles.sectionButton}/>
      </View>
      </TouchableHighlight>
      <View key={rowID} style={styles.separator} />
      </View>
    )
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
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
})
