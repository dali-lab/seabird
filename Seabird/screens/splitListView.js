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
import { CustomList } from './../components/customList';
import { ButtonSwitches } from './../components/buttonSwitches.js';
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

export default class SplitListView extends Component {

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
      <View style={{flex: 1, backgroundColor: 'white'}}>
      <NavBar navigator={this.props.navigator} text="Filler"/>
      <ButtonSwitches first="Mens" second="Womens"/>
      <CustomList dataSourceIdentifier="sports/mens" navigator={this.props.navigator} updateViewName={this.props.updateViewName}
      updateViewURL={this.props.updateViewURL}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the section with the selection options */
  selectorSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 100,
    alignItems: 'center',
    backgroundColor: 'green',
  },

  /* Style for the selection options view */
  selectionOptionsSection: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

});

AppRegistry.registerComponent('SplitListView', () => SplitListView);
