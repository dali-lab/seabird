import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  WebView,
  Image,
  ListView,
} from 'react-native';
import { BackButton } from './backButton';

const { width, height } = Dimensions.get('window');
const WEBVIEW_REF = 'webview';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export class ActionList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemsSource: ds.cloneWithRows([]),
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = () => {
    // Fetch the data from Firebase and update the itemsSource object
    this.setState({ itemsSource: ds.cloneWithRows([1, 1, 1, 1, 1, 1, 1, 1]) });
  }
  completeAction = () => {
    // Send the new information to the database
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <View style={styles.itemSection}>
        <Text style={styles.itemTitle}>Building Location</Text>
        <TouchableHighlight style={styles.itemAction} onPress={this.completeAction(this)}>
          <Text>Star</Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    return (
      <View style={{ width }}>
        <ListView
          dataSource={this.state.itemsSource}
          renderRow={this.renderRow.bind(this)}
          contentContainerStyle={styles.grid}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the section for each item */
  itemSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: height / 13,
    margin: 4,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "green",
    borderRadius: 3,
  },

  /* Style for the section's title for each item */
  itemTitle: {
    marginTop: height / 50,
    fontSize: 22,
    fontWeight: '400',
  },

  /* Style for the section's action for each item */
  itemAction: {
    marginTop: height / 40,
  },

});
