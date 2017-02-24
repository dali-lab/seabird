import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  ScrollView,
  ListView,
  Animated,
} from 'react-native';
import { NavBar } from './components/navBar';

const NAVBAR_TEXT = 'Customize';
const {width, height} = Dimensions.get('window');

let SortableListView = require('react-native-sortable-listview');

let data = {
  a: {text: 'food'},
  b: {text: 'events'},
  c: {text: 'map'},
  d: {text: 'schedule'},
  e: {text: 'sports'},
  f: {text: 'news'},
  g: {text: 'blitz'},
  h: {text: 'laundry'},
}

let order = Object.keys(data); //Array of keys

let RowComponent = React.createClass({
  render: function() {
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
  }
})

let MyComponent = React.createClass({
  render: function() {
    return <SortableListView
          style={{flex: 1, width: width,}}
          data={data}
          order={order}
          onRowMoved={e => {
            order.splice(e.to, 0, order.splice(e.from, 1)[0]);
            this.forceUpdate();
          }}
          renderRow={row => <RowComponent data={row} />}
        />
  }
});


export default class Customize extends Component {

  constructor(props) {
    super(props);
  };

  navigatePop() {
    this.props.navigator.pop();
  }

  navigatePush(routeName) {
    this.props.navigator.push({
      name: routeName
    })
  }

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
        <View style={styles.mainContent}>
          <Text style={styles.settingsTitle}>Customize your homepage!</Text>
          <MyComponent />
        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  /* Style for the enter page */
  pageContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  /* Styles the back button */
  backIcon: {
    flex: 0,
    height: 20,
    resizeMode: 'center',
  },

  /* Style for the main section that will hold all the of the DDS content */
  mainContent: {
    width: 350,
    height: 525,
    backgroundColor: '#ddd',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: width,
    height: height,
  },

  /* Style for the section that holds the swipe headers */
  contentHeader: {
    width: 325,
    height: 125,
    marginTop: 20,
    backgroundColor: 'red',
  },

  /* Style for the intro phrase */
  settingsText: {
    fontSize: 18,
    fontFamily: 'System',
    textAlign: 'left',
  },

  /* Style for the intro phrase */
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    marginBottom: 20,
  },

  /* Style for the current meal swipe */
  settingsTitle: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },

  contentInformation: {
    width: width,
  },

  settingsList: {
    padding: 25,
    backgroundColor: "#FBFBFB",
    borderBottomWidth:1,
    borderColor: '#eee',
    width: width,
  },

  listItem: {
    fontSize: 22,
    fontFamily: 'System',
    fontWeight: '400',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },

  /* Style for the divider in the list */
  divider: {
    height: 1,
    backgroundColor: '#bbb',
  },

});




AppRegistry.registerComponent('Customize', () => Customize);
