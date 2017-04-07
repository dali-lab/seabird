import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import { NavBar } from './components/navBar';
import { CustomizeList } from './components/customizeList';

const { height, width } = Dimensions.get('window');
const NAVBAR_TEXT = 'Customize';
import SortableGrid from 'react-native-sortable-grid';

// React Dragable

const HOME_PORTALS = [
  {
    txtName: 'Dining',
    navName: 'dds',
    imgName: require('./Icons/Restaurant-50-White.png'),
  }, {
    txtName: 'Events',
    navName: 'events',
    imgName: require('./Icons/T-Shirt-50-White.png'),
  }, {
    txtName: 'News',
    navName: 'news',
    imgName: require('./Icons/News-50-White.png'),
  }, {
    txtName: 'Campus Map',
    navName: 'map',
    imgName: require('./Icons/Map-Marker-50-White.png'),
  }, {
    txtName: 'Schedule',
    navName: 'schedule',
    imgName: require('./Icons/Calendar-50-White.png'),
  }, {
    txtName: 'Sports',
    navName: 'sports',
    imgName: require('./Icons/Sport-50-White.png'),
  }, {
    txtName: 'Green Print',
    navName: 'tutorial',
    imgName: require('./Icons/Print-50-White.png'),
  }, {
    txtName: 'Dominos',
    navName: 'dominos',
    imgName: require('./Icons/Pizza-50-White.png'),
  }, {
    txtName: 'Combo Keeper',
    navName: 'combokeeper',
    imgName: require('./Icons/Sport-50-White.png'),
  },
];

export default class Customize extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tileOrder: [],
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

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} type="down" />
        <View style={styles.mainContent}>
          {/* <CustomizeList />*/}

          <SortableGrid
            itemsPerRow={4}
            dragActivationTreshold={100}
            onDragRelease={itemOrder => console.log('Drag was released, the blocks are in the following order: ', itemOrder)}
          >
            {HOME_PORTALS.map((letter, index) => (<View key={index}>
              <Text>{letter.txtName}</Text>
            </View>))}
          </SortableGrid>
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
    backgroundColor: '#ddd',
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
});

AppRegistry.registerComponent('Customize', () => Customize);
