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
      buttonText: 'Star',
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = () => {
    // Fetch the data from Firebase and update the itemsSource object
    this.setState({ itemsSource: ds.cloneWithRows([1, 1, 1, 1, 1, 1, 1, 1]) });
    //this.setState({ itemsSource: ds.cloneWithRows(this.props.information)})
  }

  completeAction = () => {
    // Send the new information to the database
    // Update the state of the button
    console.log('Button Pressed')
    this.setState({ buttonText: 'Pressed' });
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <View style={styles.itemSectionGreen}>
        <Text style={styles.itemTitleGreen}>Building Location</Text>
        <Text style={styles.itemTime}>Time</Text>
        <TouchableHighlight style={styles.itemAction} underlayColor="transparent" onPress={()=> this.completeAction(this)}>
          <Text>{this.state.buttonText}</Text>
        </TouchableHighlight>
      </View>
    );
  }

  renderHeader(rowData, sectionID, rowID) {
    return (
      <View />
    )
  }

  render() {
    return (
      <View style={{ width}}>
        <View style={styles.sectionHeader}>
        </View>
        <ListView
          dataSource={this.state.itemsSource}
          renderRow={this.renderRow.bind(this)}
          renderHeader={this.renderHeader.bind(this)}
          contentContainerStyle={styles.grid}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the section that will hold the sorting function */
  sectionHeader: {
    height: 80,
    backgroundColor: 'rgb(184, 240, 255)',

  },

  /* Style for the section for each item - green*/
  itemSectionGreen: {
    width: width / 1.05,
    height: height / 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 4,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgb(15, 164, 61)',
    backgroundColor: 'rgba(152, 255, 159, 0.1)',
    alignSelf: 'center',
  },

  /* Style for the section for each item - red */
  itemSectionRed: {
    width: width / 1.05,
    height: height / 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 4,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgb(227, 56, 56)',
    backgroundColor: 'rgba(227, 56, 56, 0.05)',
    alignSelf: 'center',
  },

  /* Style for the section's title for each item - green */
  itemTitleGreen: {
    marginTop: height / 38,
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Verdana',
    color: 'rgb(15, 164, 61)',
  },

  /* Style for the section's title for each item - red */
  itemTitleRed: {
    marginTop: height / 38,
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Verdana',
    color: 'rgb(227, 56, 56)',
  },

  /* Style for the section's time */
  itemTime: {
    marginTop: height / 33,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Avenir',
    color: 'rgb(15, 164, 61)'
  },

  /* Style for the section's action for each item */
  itemAction: {
    marginTop: height / 30,
  },

});
