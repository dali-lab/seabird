import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  ListView,
  Animated,
  AsyncStorage
} from 'react-native';

import {Tile} from './components/tile';

const COLOR1 = '#000'; // used for 3/6 buttons and the Next button (NOTE: original color)
const COLOR2 = '#01964d'; // used for the other 3/6 buttons
const SCHOOL_NAME = 'Dartmouth College'; // used for the title bar (although this will eventually be an image)
const {height, width} = Dimensions.get('window');
import SortableGrid from 'react-native-sortable-grid'

const HOME_PORTALS = [
  {
    'txtName': 'Dining',
    'navName': 'dds',
    'imgName': require('./Icons/Restaurant-50-White.png')
  }, {
    'txtName': 'Events',
    'navName': 'events',
    'imgName': require('./Icons/T-Shirt-50-White.png')
  }, {
    'txtName': 'News',
    'navName': 'news',
    'imgName': require('./Icons/News-50-White.png')
  }, {
    'txtName': 'Campus Map',
    'navName': 'map',
    'imgName': require('./Icons/Map-Marker-50-White.png')
  }, {
    'txtName': 'Schedule',
    'navName': 'schedule',
    'imgName': require('./Icons/Calendar-50-White.png')
  }, {
    'txtName': 'Sports',
    'navName': 'sports',
    'imgName': require('./Icons/Sport-50-White.png')
  }, {
    'txtName': 'Green Print',
    'navName': 'testing',
    'imgName': require('./Icons/Print-50-White.png')
  }, {
    'txtName': 'Dominos',
    'navName': 'dominos',
    'imgName': require('./Icons/Pizza-50-White.png')
  }, {
    'txtName': 'Combo Keeper',
    'navName': 'combokeeper',
    'imgName': require('./Icons/Sport-50-White.png')
  },
];

export default class Testing extends Component {

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({name: routeName, transitionType: transitionType})
  }

  GET = (schoolID, view, viewID) => {
    fetch('http://localhost:3000/api/schools/' + schoolID + '/' + view + '/' + viewID).then((response) => response.json()).then((responseJson) => {
      console.log(responseJson)
    }).catch((error => console.error(error)))
  }

  constructor(props) {
    super(props);
    var tiles = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid
    });
    this.state = {
      bounceValue: new Animated.Value(0),
      homeSource: tiles.cloneWithRows(HOME_PORTALS),
      tileOrder: []
    }
  };

  componentDidMount() {
    AsyncStorage.getItem('tileOrder').then((value) => {
      this.setState({tileOrder: value});
    }).done();
  }

  renderRow(rowData, sectionID, rowID) {
    if (rowID == 0 || rowID == 3 || rowID == 4) {
      return (<Tile navigator={this.props.navigator} navName={HOME_PORTALS[rowID]['navName']} imgSource={HOME_PORTALS[rowID]['imgName']} text={HOME_PORTALS[rowID]['txtName']} tileStyle={styles.tile2} textStyle={styles.tileText1}/>)
    } else if (rowID == 1 || rowID == 2 || rowID == 5) {
      return (<Tile navigator={this.props.navigator} navName={HOME_PORTALS[rowID]['navName']} imgSource={HOME_PORTALS[rowID]['imgName']} text={HOME_PORTALS[rowID]['txtName']} tileStyle={styles.tile1} textStyle={styles.tileText1}/>)
    }
    return (<Tile navigator={this.props.navigator} navName={HOME_PORTALS[rowID]['navName']} imgSource={HOME_PORTALS[rowID]['imgName']} text={HOME_PORTALS[rowID]['txtName']} tileStyle={styles.tile3} textStyle={styles.tileText2}/>)
  }

  // TODO: consider using ScrollView instead to load all home tiles at beginning
  render() {
    console.log(this.state.tileOrder);
    return (
      <View style={{/*flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center',*/
      paddingTop: 30,
      }}>

        {/*<View style={styles.mainHeader}>
          <TouchableHighlight underlayColor="transparent" onPress={this.navigate.bind(this, 'settings', 'down')}>
            <Image source={require('./Icons/User-Menu-Male-48.png')} style={styles.settingsIcon}/>
          </TouchableHighlight>
          <Text style={styles.schoolTitle}>{SCHOOL_NAME}</Text>
          <TouchableHighlight underlayColor="transparent" onPress={this.navigate.bind(this, 'customize', 'down')}>
            <Image source={require('./Icons/Settings-48.png')} style={styles.settingsIcon}/>
          </TouchableHighlight>
        </View>

        <View>

          <ListView dataSource={this.state.homeSource} renderRow={this.renderRow.bind(this)} contentContainerStyle={styles.grid}></ListView>

        </View>*/}
        <SortableGrid
          itemsPerRow = {2}
        >
          {HOME_PORTALS.map((letter, index) =>
            <View key={index}>
            {index == 0 || index == 3 || index == 4  ? <Tile navigator={this.props.navigator} navName={letter.navName} imgSource={letter.imgName} text={letter.txtName} tileStyle={styles.tile2} textStyle={styles.tileText1}/> : null}

            {index == 1 || index == 2 || index == 5  ? <Tile navigator={this.props.navigator} navName={letter.navName} imgSource={letter.imgName} text={letter.txtName} tileStyle={styles.tile1} textStyle={styles.tileText1}/> : null}

            {index >= 6 ? <Tile navigator={this.props.navigator} navName={letter.navName} imgSource={letter.imgName} text={letter.txtName} tileStyle={styles.tile3} textStyle={styles.tileText1}/> : null}
            </View>
          )}
        </SortableGrid>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the header section that holds the school name and crest */
  mainHeader: {
    width: width,
    height: 60,
    marginBottom: 2,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  /* Style for the school title text */
  schoolTitle: {
    fontSize: 23,
    fontFamily: 'System',
    fontWeight: '300',
    color: '#000',
    letterSpacing: -0.56,
  },

  /* Style for three of the main home screen tile buttons */
  tile1: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 2.1,
    height: height / 4,
    paddingBottom: 20,
    margin: 2,
    backgroundColor: COLOR1,
  },

  /* Style for the other three of the main home screen tile buttons */
  tile2: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 2.1,
    height: height / 4,
    margin: 2,
    backgroundColor: COLOR2,
  },

  /* Style for the smaller tiles on the home screen */
  tile3: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 3.18,
    height: height / 6,
    margin: 2,
    backgroundColor: COLOR1,
  },

  /* Style for the main label texts on the main buttons */
  tileText1: {
    top: 40,
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
  },

  /* Style for the main label texts on the main buttons */
  tileText2: {
    top: 15,
    fontSize: 20,
    fontFamily: 'System',
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
  },

  /* Styles the grid format of the list view */
  grid: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    height: height * 1.1,
  },

  /* Style for the bottom button that moves to the next page */
  nextButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
    marginTop: 15,
    backgroundColor: COLOR1,
  },

  /* Style for the icons on the main buttons */
  mainIcon: {
    top: 10
  },

  /* Style for the settings icon up in the top bar */
  settingsIcon: {
    flex: 0,
    height: 30,
    resizeMode: 'contain',
  },

  /* Styles the more options down button */
  downIcon: {
    flex: 1,
    height: 10,
    resizeMode: 'center',
  }
});

AppRegistry.registerComponent('Testing', () => Testing);