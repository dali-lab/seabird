import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SortableListView = require('react-native-sortable-listview');

const data = {
  a: { text: 'food' },
  b: { text: 'events' },
  c: { text: 'map' },
  d: { text: 'schedule' },
  e: { text: 'sports' },
  f: { text: 'news' },
  g: { text: 'blitz' },
  h: { text: 'laundry' },
};

const order = Object.keys(data); // Array of keys

const RowComponent = React.createClass({
  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        delayLongPress={500} /* 500ms hold delay */
        style={styles.settingsList}
        {...this.props.sortHandlers}
      >
        <Text>{this.props.data.text}</Text>
      </TouchableHighlight>
    );
  },
});


export class MyComponent extends Component {

  navigatePop() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <SortableListView
        style={{ flex: 1, width: width }}
        data={data}
        order={order}
        onRowMoved={e => {
          order.splice(e.to, 0, order.splice(e.from, 1)[0]);
          this.forceUpdate();
        }}
        renderRow={row => <RowComponent data={row} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  settingsList: {
    padding: 25,
    backgroundColor: '#FBFBFB',
    borderBottomWidth: 1,
    borderColor: '#eee',
    width: width,
  },
});
