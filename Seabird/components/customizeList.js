import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Dimensions,
  AsyncStorage
} from 'react-native';

const {width, height,} = Dimensions.get('window');
const SortableListView = require('react-native-sortable-listview');
const customOrder = [
  {
    position: '1',
    text: 'Dining',
  }, {
    position: '2',
    text: 'Laundry',
  }, {
    position: '3',
    text: 'News',
  }, {
    position: '4',
    text: 'Campus Map',
  }, {
    position: '5',
    text: 'Schedule',
  }, {
    position: '6',
    text: 'Sports',
  },
];

const order = Object.keys(customOrder); // Array of keys

const RowComponent = React.createClass({
  render() {
    return (
      <TouchableHighlight underlayColor={'#eee'} delayLongPress={300} /* 500ms hold delay */
  style={styles.settingsList} {...this.props.sortHandlers}>
        <Text>{this.props.customOrder.text}</Text>
      </TouchableHighlight>
    );
  }
});

export class CustomizeList extends Component {

  navigatePop = () => {
    this.props.navigator.pop();
  }

  saveData = (key, value) => {
    AsyncStorage.setItem(key, value);
  }

  printOrder = () => {
    var finalString = ''
    for (i = 0; i < customOrder.length; i++) {
      finalString += ' ' + customOrder[i].position
    }
  }

  render() {
    this.printOrder()
    return (
      <SortableListView style={{
        flex: 1,
        width: width,
      }} data={customOrder} order={order} onRowMoved={e => {
        order.splice(e.to, 0, order.splice(e.from, 1)[0]);
        this.saveData('tileOrder', order.toString());
        this.forceUpdate();
      }} renderRow={row => <RowComponent customOrder={row}/>}/>
    );
  }
}

const styles = StyleSheet.create({
  settingsList: {
    padding: 25,
    backgroundColor: '#FBFBFB',
    borderBottomWidth: 1,
    borderColor: '#eee',
    width: width
  }
});
