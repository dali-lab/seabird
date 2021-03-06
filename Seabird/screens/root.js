import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  Animated,
  PixelRatio,
  TextInput,
  LayoutAnimation,
} from 'react-native';
import { NavBar } from './../components/navBar';
import { PageList } from './../components/pageList';
import { SearchBar } from './../components/searchBar';
import Swiper from 'react-native-swiper';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';

const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');


const { height, width } = Dimensions.get('window');

let GRID_PADDING = width / 15;
let PAGE_DOTS = height / 5.2;
if (PixelRatio.get() <= 2) {
  GRID_PADDING = width / 12;
  PAGE_DOTS = height / 4.3
}

// Spring
let CustomLayoutSpring = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.7,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7,
  },
};

export default class Root extends Component {

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({ name: routeName, transitionType });
  }

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      bounceValue: new Animated.Value(0),
      HOME_PORTALS: []
    };
  }

  componentWillReceiveProps(nextProps) {
    Database.listenUserHomeOrder((value) => {
      try {
        if (value !== '' && value !== '[]' && value !== null && value !== undefined && !(value.length <= 0)) {
            this.setState({ HOME_PORTALS: JSON.parse(value)})
        } else {
          this.props.updateHome(JSON.stringify(this.props.HOME_PORTALS));
          Database.setUserHomeOrder(JSON.stringify(this.props.HOME_PORTALS));
          this.setState({ HOME_PORTALS: this.props.HOME_PORTALS });
        }
      } catch(e) {
        console.log(e)
      }
    })
  }


  componentWillMount() {
    Database.listenUserHomeOrder((value) => {
      try {
        if (value !== '' && value !== '[]' && value !== null && value !== undefined && !(value.length <= 0)) {
            this.setState({ HOME_PORTALS: JSON.parse(value)})
        } else {
          this.props.updateHome(JSON.stringify(this.props.HOME_PORTALS));
          Database.setUserHomeOrder(JSON.stringify(this.props.HOME_PORTALS));
          this.setState({ HOME_PORTALS: this.props.HOME_PORTALS });
        }
      } catch(e) {
        console.log(e)
      }
    })
  }

  searchModules = (text) => {
    let searchKey = text;
    if (searchKey.length > 0) {
      let updateHomeOrder = [];
      for (let i = 0; i < this.props.HOME_PORTALS.length; i++) {
        if (this.props.HOME_PORTALS[i].txtName.substring(0, searchKey.length).toUpperCase() === searchKey.toUpperCase() || this.props.HOME_PORTALS[i].navName.substring(0, searchKey.length).toUpperCase() === searchKey.toUpperCase()) {
          updateHomeOrder.push(this.props.HOME_PORTALS[i])
        }
      }
        this.setState({ HOME_PORTALS: updateHomeOrder });
        LayoutAnimation.configureNext(CustomLayoutSpring);

    } else if (searchKey === '') {
      Database.listenUserHomeOrder((value) => {
        this.setState({ HOME_PORTALS: JSON.parse(value)})
      });
      LayoutAnimation.configureNext(CustomLayoutSpring);
    }
  };


  render() {
    let moduleList = [];
    const views = [];
    for (let i = 0; i < (this.state.HOME_PORTALS.length / 6); i++) {
      if (i + 1 > this.state.HOME_PORTALS.length / 6) {
        for (let j = 0; j < this.state.HOME_PORTALS.length - (6 * i); j++) {
            moduleList[j] = this.state.HOME_PORTALS[(6 * i) + j];
          }
      } else {
        for (let j = 0; j < 6; j++) {
          if (this.state.HOME_PORTALS[(6 * i) + j]) {
            moduleList[j] = this.state.HOME_PORTALS[(6 * i) + j];
          }
        }
      }

      views.push(
        /* Populating each page of the home view */
        <View key={i} style={{ width, height }}>
          <PageList modules={moduleList} containerStyle={styles.grid} navigator={this.props.navigator} />
        </View>,
      );
      moduleList = [];
    }

    return (
      <Image source={require( '../Icons/Login/gradient_background.png' )} style={styles.gradientBackground}>
        <View style={styles.mainHeader}>
          <NavBar navigator={this.props.navigator} schoolTitle="Dartmouth College" rightButton="True" />
        </View>
        <SearchBar
          placeholder="Search Modules"
          searchSectionStyle={styles.searchSection}
          searchInputStyle={styles.searchSectionInput}
          searchButtonStyle={styles.searchSectionButton}
          searchIconStyle={styles.searchIcon}
          onTextChangeAction={this.searchModule}
          onChangeText={(text) => {
            this.setState({ searchText: text });
            this.searchModules(text);
          }}/>
        <Swiper
          containerCustomStyle={styles.wrapper}
          contentContainerCustomStyle={styles.wrapper}
          showsButtons={false}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          paginationStyle={styles.pagination}
          loop={false}>
          {views}
        </Swiper>
      </Image>
    );
  }
}

const styles = StyleSheet.create({

  /* Style for the section that holds the search bar */
  searchSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width / 1.2,
    height: 40,
    marginTop: 15,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,1)',
    borderRadius: 20,
  },

  /* Style for the search bar */
  searchSectionInput: {
    width: width / 1.6,
    height: 40,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 10,
  },

  /* Style for the search bar button */
  searchSectionButton: {
    width: 10,
    height: 10,
    alignSelf: 'center',
    marginTop: -10,
    paddingRight: 20,
  },

  /* Style for the search button's icon */
  searchIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },

  /* Style for the navigation dots */
  dot: {
    backgroundColor: 'rgba(10,10,10,.2)',
    width: 5,
    height: 5,
    borderRadius: 4,
    margin: 3,
  },

  /* Style for the navigation dots while activated */
  activeDot: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },

  /* Style for the page pagination */
  pagination: {
    bottom: PAGE_DOTS,
    left: 0,
    right: 0
  },

  /* Style for main background image. */
  gradientBackground: {
    height: height,
    width: width,
    resizeMode: 'stretch',
    flexDirection: 'column',
    alignItems: 'center',
  },

  /* Style for the header section that holds the school name and crest */
  mainHeader: {
    width,
    height: 60,
    marginBottom: 2,
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
    paddingLeft: GRID_PADDING,
    paddingRight: GRID_PADDING,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    height
  },

});

AppRegistry.registerComponent('Root', () => Root);
