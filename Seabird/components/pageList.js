import React, { Component } from 'react';
import {
  TouchableHighlight,
  Image,
  Text,
  View,
  ListView,
  StyleSheet,
  Dimensions
} from 'react-native';

import { Tile } from './tile';
const { height, width } = Dimensions.get('window');

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
        textStyle={styles.tileText}
      />
    )
  }

  render() {
    console.log('re renderin page list')
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: width / 2.4,
    height: height / 4.2,
    paddingBottom: 20,
    marginTop: width / 18,
    margin: width / 25,
    borderRadius: 10,
  },

  /* Style for the tiles' text for the home screen */
  tileText: {
    top: 40,
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '400',
    textAlign: 'center',
    color: '#065539',
  },
})
