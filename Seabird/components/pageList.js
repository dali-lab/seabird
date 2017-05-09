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

import { Tile } from './tile';
const { height, width } = Dimensions.get('window');

let MODULE_FONT_SIZE = 20;
let MODULE_TEXT_PADDING = 0;

if (PixelRatio.get() <= 2) {
  MODULE_FONT_SIZE = 18;
  MODULE_TEXT_PADDING = -5;
}

export class PageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => true,
      }).cloneWithRows(this.props.modules),
    };
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        dataSource: new ListView.DataSource({
          rowHasChanged: (r1, r2) => true,
        }).cloneWithRows(nextProps.modules),
      })
  }

  renderRow = (rowData, sectionID, rowID) => {
    return (
      <Tile
        navigator={this.props.navigator}
        navName={this.props.modules[rowID].navName}
        imgSource={this.props.modules[rowID].imgName}
        text={this.props.modules[rowID].txtName}
        tileStyle={styles.tile}
        tileTextSection={styles.tileTextSection}
        textStyle={styles.tileText}
      />
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
    height
  },

  /* Style for the tiles for the home screen */
  tile: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: width / 2.9,
    height: height / 5.1,
    paddingBottom: 20,
    marginTop: width / 18,
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
})
