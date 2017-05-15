import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableHighlight,
  Image,
  Text,
  View,
  ListView,
  StyleSheet,
  Dimensions,
  PixelRatio
} from 'react-native';

import { NavBar } from './../components/navBar';
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

export class SplitListView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => true,
      }).cloneWithRows([1, 1, 1, 1]),
    };
  }

  componentWillReceiveProps(nextProps) {
      /*this.setState({
        dataSource: new ListView.DataSource({
          rowHasChanged: (r1, r2) => true,
        }).cloneWithRows(nextProps.modules),
      })*/
  }

  renderRow = (rowData, sectionID, rowID) => {
    return (
      <View>
        <Text>Howdy</Text>
      </View>
    )
  }

  render() {
    return (
      <ListView
        scrollEnabled={false}
        style={styles.section}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        contentContainerStyle={this.props.containerStyle}
      />
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the section that holds the tiles */
  section: {
  },

  /* Style for the tiles for the home screen */
  tile: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    paddingBottom: 20,
    marginTop: width / 15,
    margin: width / 25,
    borderRadius: (width / 2.8) / 2,
    borderWidth: 2,
    borderColor: '#fff'
  },

  /* Style for the section of the tiles that hold the tet */
  tileTextSection: {
    marginTop: 0,
  },

  /* Style for the tiles' text for the home screen */
  tileText: {
    paddingTop: MODULE_TEXT_PADDING,
    fontSize: MODULE_FONT_SIZE,
    fontFamily: 'Avenir-Book',
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
  },
});

AppRegistry.registerComponent('SplitListView', () => SplitListView);
