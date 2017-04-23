import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions,
  ScrollView,
} from 'react-native';
import { NavBar } from './../components/navBar';
import { CustomizeList } from './../components/customizeList';

const { height, width } = Dimensions.get('window');
const NAVBAR_TEXT = 'Customize';
import SortableGrid from 'react-native-sortable-grid';

let HOME_PORTALS = [];

export default class Customize extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tileOrder: [],
      scrolling: true,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('tileOrder').then((value) => {
      this.setState({ tileOrder: value });
    }).done();
  }

  navigatePop() {
    this.props.navigator.pop();
  }

  navigatePush(routeName) {
    this.props.navigator.push({ name: routeName });
  }

  rearrange = (value) => {
    this.setState({ scrolling: true })
    var newHome = HOME_PORTALS
    for (var i = 0; i < HOME_PORTALS.length; i++) {
        newHome[i] = HOME_PORTALS[value.itemOrder[i].key]
    }
    console.log(newHome)
    AsyncStorage.setItem('homeOrder', JSON.stringify(newHome))
  }

  render() {
    AsyncStorage.getItem('homeOrder').then((value) => {
      // console.log(JSON.parse(value));
      HOME_PORTALS = JSON.parse(value);
    }).done();
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} type="down" />
        <View style={styles.mainContent}>
          <ScrollView scrollEnabled={this.state.scrolling}>
            <SortableGrid
              itemsPerRow={2}
              dragActivationTreshold={100}
              onDragStart={() => this.setState({ scrolling: false })}
              onDragRelease={itemOrder => this.rearrange(itemOrder)}
              style={styles.grid}
            >
              {HOME_PORTALS.map((letter, index) => (
                <View style={styles.option} key={index}>
                  <Text style={styles.optionText}>{letter.txtName}</Text>
                </View>))}
            </SortableGrid>
          </ScrollView>
        </View>
      </View>
    );
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
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width,
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
    width,
  },

  settingsList: {
    padding: 25,
    backgroundColor: '#FBFBFB',
    borderBottomWidth: 1,
    borderColor: '#eee',
    width,
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

  /* Style for the options for the customized tiles */
  option: {
    justifyContent: 'center',
    borderRadius: 5,
    width: width / 2.5,
    height: height / 4.5,
    backgroundColor: 'white',
    backgroundColor: '#ddd',
    alignSelf: 'center',
  },

  /* Style for the options' text */
  optionText: {
    fontSize: 12,
    textAlign: 'center',
  },

  /* Style for the Sortable Grid */
  grid: {
    height: 30,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('Customize', () => Customize);