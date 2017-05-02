import React, { Component } from 'react';
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
  AsyncStorage,
  ScrollView,
} from 'react-native';

import { Tile } from './../components/tile';
import { NavBar } from './../components/navBar';
import { PageList } from './../components/pageList';
import Carousel from 'react-native-snap-carousel';
import Firebase from '../firebase/firebase';
// import Analytics from '../firebase/analytics';
// var Analytics = require('react-native-firebase-analytics');

const COLOR1 = '#00713A'; // used for 3/6 buttons and the Next button (NOTE: original color)
const COLOR2 = '#01964d'; // used for the other 3/6 buttons
const SCHOOL_NAME = 'Seabird University'; // used for the title bar (although this will eventually be an image)
const { height, width } = Dimensions.get('window');
const views = []
export default class Root extends Component {

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({ name: routeName, transitionType });
  }

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
      HOME_PORTALS: [
        {
          txtName: 'Dining',
          navName: 'dining',
          imgName: require('./../Icons/Restaurant-50-White.png'),
        }, {
          txtName: 'Events',
          navName: 'events',
          imgName: require('./../Icons/T-Shirt-50-White.png'),
        }, {
          txtName: 'WebView',
          navName: 'web',
          imgName: require('./../Icons/News-50-White.png'),
        }, {
          txtName: 'Campus Map',
          navName: 'map',
          imgName: require('./../Icons/Map-Marker-50-White.png'),
        }, {
          txtName: 'Schedule',
          navName: 'schedule',
          imgName: require('./../Icons/Calendar-50-White.png'),
        }, {
          txtName: 'WebView',
          navName: 'web',
          imgName: require('./../Icons/News-50-White.png'),
        }, {
          txtName: 'Green Print',
          navName: 'tutorial',
          imgName: require('./../Icons/Print-50-White.png'),
        }, {
          txtName: 'Food',
          navName: 'food',
          imgName: require('./../Icons/Restaurant-50-White.png'),
        }, {
          txtName: 'Combo Keeper',
          navName: 'combokeeper',
          imgName: require('./../Icons/Sport-50-White.png'),
        }, {
          txtName: 'Testing',
          navName: 'testing',
          imgName: require('./../Icons/News-50-White.png'),
        },
      ],
      homeSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => true,
      }).cloneWithRows([1, 1, 1, 1, 1, 1]),
    };
  }

  partitionModules = (items) => {
    var moduleList = [];
    for (var i = 0; i < items.length / 6; i++) {
      if (i + 1 > items.length / 6) {
        for (var j = 0; j < items.length - (6 * i); j++) {
          moduleList[j] = items[items.length - (6 * i) + j]
        }
      } else {
        for (var j = 0; j < 6; j++) {
          moduleList[j] = items[(6 * i) + j]
        }
      }
      views.push(
        <View key={i} style={{ width, height, backgroundColor: '#00713A' }}>
        <PageList modules={moduleList} containerStyle={styles.grid} navigator={this.props.navigator}/>
        </View>,
      );
      moduleList = []
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('homeOrder').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('homeOrder', JSON.stringify(this.state.HOME_PORTALS));
      } else {
        this.setState({ HOME_PORTALS: JSON.parse(value) });
        this.partitionModules(this.state.HOME_PORTALS)
      }
    }).done();
    this.render();
  }

  render() {
    AsyncStorage.getItem('homeOrder').then((value) => {
      this.setState({ HOME_PORTALS: JSON.parse(value) });
    }).done();
    return (
      <View
        style={{
          alignItems: 'flex-start',
          backgroundColor: '#065539',
        }}
      >

        <View style={styles.mainHeader}>
          <NavBar navigator={this.props.navigator} schoolTitle="Seabird University" rightButton="True" />
        </View>
        <Carousel
          style={styles.scrollview}
          indicatorStyle={'white'}
          itemWidth={width}
          sliderWidth={100}
          scrollEventThrottle={200}
          inactiveSlideScale={1}
          bounces={false}
        >
        {views}
        </Carousel>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the header section that holds the school name and crest */
  mainHeader: {
    width,
    height: 60,
    marginBottom: 2,
    backgroundColor: '#00713A',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  /* Style for the school title text */
  schoolTitle: {
    fontSize: 23,
    fontFamily: 'System',
    fontWeight: '300',
    color: '#000',
    letterSpacing: -0.56,
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

  /* Styles the grid format of the list view */
  grid: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    height: height * 1.2,
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
    top: 10,
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
  },
});

AppRegistry.registerComponent('Root', () => Root);
