import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions,
  TouchableHighlight,
  ListView,
  TextInput,
  Image,
  LayoutAnimation,
} from 'react-native';
import {NavBar} from './../components/navBar';
import EventItem from './../components/eventItem';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';
import Moment from 'moment'

const { height, width } = Dimensions.get('window');
const NAVBAR_TEXT = 'Events';

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

// Linear with easing
var CustomLayoutLinear = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.curveEaseInEaseOut,
  },
};

// Spring
var CustomLayoutSpring = {
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

export default class Events extends Component {

  constructor(props) {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      firstPressStatus: true,
      secondPressStatus: false,
      thirdPressStatus: true,
      fourthPressStatus: false,
      dataBlob: {},
      loaded: false,
      //dataSource: ds.cloneWithRows([' ',]),
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      })
    };
  }

  componentWillMount() {
    Database.listenEvents((value) => {
      var tempDataBlob = {};
      var start = 0
      var end = 0
      console.log('value length: ' + value.length);
      for (var i = 0; i < value.length; i++) {
        var date = new Date(value[i].day).toDateString();
        if (!tempDataBlob[date]) {
          tempDataBlob[date] = []
        }
        tempDataBlob[date].push(value[i])
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(tempDataBlob),
      })
    })
  }

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({ name: routeName, transitionType: transitionType, })
  }

  navigatePop() {
    this.props.navigator.pop();
  }

  navigatePush(routeName, userEvent) {
    this.props.passEvent(userEvent)
    this.props.navigator.push({
      name: routeName,
    });
  }

  firstToggleButton(){
    if (!this.state.firstPressStatus) {
      this.setState({ firstPressStatus: !this.state.firstPressStatus });
      this.setState({ secondPressStatus: !this.state.secondPressStatus });
    }
  }

  secondToggleButton(){
    if (!this.state.secondPressStatus) {
      this.setState({ firstPressStatus: !this.state.firstPressStatus });
      this.setState({ secondPressStatus: !this.state.secondPressStatus });
    }
  }

  thirdToggleButton(){
    if (!this.state.thirdPressStatus) {
      this.setState({ thirdPressStatus: !this.state.thirdPressStatus });
      this.setState({ fourthPressStatus: !this.state.fourthPressStatus });
    }
  }

  fourthToggleButton(){
    if (!this.state.fourthPressStatus) {
      this.setState({ thirdPressStatus: !this.state.thirdPressStatus });
      this.setState({ fourthPressStatus: !this.state.fourthPressStatus });
    }
  }

  searchModules = (text) => {
    let searchKey = text;
    if (searchKey.length > 0) {
      var updateListOrder = []
      for (var i = 0; i < this.state.dataSource.sectionIdentities.length; i++) {
        for (var j = 0; j < this.state.dataSource._dataBlob[this.state.dataSource.sectionIdentities[i]].length; j++) {
            if (this.state.dataSource._dataBlob[this.state.dataSource.sectionIdentities[i]][j].event.substring(0, searchKey.length).toUpperCase() === searchKey.toUpperCase()) {
              updateListOrder.push(this.state.dataSource._dataBlob[this.state.dataSource.sectionIdentities[i]][j])
            }
        }
      }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(updateListOrder)
        })

    } else if (searchKey === '') {
      Database.listenEvents((value) => {
        var tempDataBlob = {};
        var start = 0
        var end = 0
        console.log('value length: ' + value.length);
        for (var i = 0; i < value.length; i++) {
          var date = new Date(value[i].day).toDateString();
          if (!tempDataBlob[date]) {
            tempDataBlob[date] = []
          }
          tempDataBlob[date].push(value[i])
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(tempDataBlob),
        })
      })
    }
  };

  renderRow = (rowData, sectionID, rowID) => {
    /* Form dates to distinguish from events */
    return (
      <TouchableHighlight key={rowData.key} underlayColor="transparent" onPress={() => this.navigatePush('eventsdetails', rowData)}>
      {/* Align items center */}
      <View style={styles.listSection}>
      <View style={styles.listSectionTime}>
        <Text style={styles.listSectionTimeText}>{Moment(rowData.startTime).format('h:mm a')}</Text>
      </View>
      <View style={styles.listSectionInfo}>
        <Text style={styles.listSectionTitle}>{rowData.event}</Text>
        <Text style={styles.listSectionText}>{rowData.location}</Text>
        <View key={rowData.key} style={styles.separator} />
      </View>
      </View>
      </TouchableHighlight>
    )
  };

  renderSectionHeader = (sectionData, sectionID) => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>{sectionID}</Text>
      </View>
    )
  };

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
        <View style={styles.sectionHeader}>
          <View style={styles.searchSection}>
            <TextInput
              style={styles.searchSectionInput}
              placeholder="Search Events"
              placeholderTextColor='rgba(255, 255, 255, 0.5)'
              selectionColor="white"
              onChangeText={(text) => {
                this.setState({ searchText: text });
                this.searchModules(text);
              }}
            />
            <TouchableHighlight
              ref="SearchBar"
              underlayColor="transparent"
              style={styles.searchSectionButton}
              onPress={() => console.log('Pressed search')}
            >
              <Image
                style={styles.searchIcon} source={require('./../Icons/search_icon.png')}
                />
            </TouchableHighlight>
          </View>

          <View style={styles.basicFlexAround}>
            <View style={styles.basicFlexBetween}>
              <Text style={styles.optionText}>SORT</Text>
              <View style={styles.basicFlexBetweenOptions}>
                <TouchableHighlight underlayColor="transparent" style={this.state.firstPressStatus ? styles.selectedOption : styles.deselectedOption}
                onPress={this.firstToggleButton.bind(this)}>
                  <Text style={styles.selectedOptionText}>Category</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="transparent" style={this.state.secondPressStatus ? styles.selectedOption : styles.deselectedOption}
                onPress={this.secondToggleButton.bind(this)}>
                  <Text style={styles.deselectedOptionText}>Alphabet</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={styles.basicFlexBetween}>
              <Text style={styles.optionText}>FILTER</Text>
              <View style={styles.basicFlexBetweenOptions}>
                <TouchableHighlight underlayColor="transparent" style={this.state.thirdPressStatus ? styles.selectedOption : styles.deselectedOption}
                onPress={this.thirdToggleButton.bind(this)}>
                  <Text style={styles.selectedOptionText}>All</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="transparent" style={this.state.fourthPressStatus ? styles.selectedOption : styles.deselectedOption}
                onPress={this.fourthToggleButton.bind(this)}>
                  <Text style={styles.deselectedOptionText}>Starred</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.mainContent}>
          <ListView
            dataSource={this.state.dataSource}
            renderSectionHeader={this.renderSectionHeader}
            renderRow={this.renderRow}
            style={styles.listStyle}
            enableEmptySections={true}
          />
          {/*
          <TouchableHighlight style={styles.CTA} onPress={this.navigate.bind(this, 'eventscalendar', 'up')}>
            <Text style={styles.CTAText}>Calendar View</Text>
          </TouchableHighlight>*/}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the section that will hold the sorting function */
  sectionHeader: {
    height: 125,
    backgroundColor: '#C6E4C0',

  },

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
    borderColor: 'white',
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

  pageContent: {
    flex: 1,
    backgroundColor: 'white',
  },

  /* Style for the main section that will hold all the of the content */
  mainContent: {
    backgroundColor: 'white',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'column',
  },

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

  /* Style for the menu option */
  CTAText: {
    fontSize: 16,
    fontFamily: 'System',
    textAlign: 'center',
    marginTop: 12,
    color: '#89E1A9',
  },

  /* Style for the Call To Action button */
  CTA: {
    width: width / 2,
    height: 50,
    borderWidth: 2,
    borderColor: '#89E1A9',
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
  },

  /* Style for the entire list view */
  listStyle: {
    backgroundColor: '#fff',
  },

  /* Style for the separator */
  separator: {
    width,
    height: 1,
    backgroundColor: '#bbb'
  },

  /* Styles for the list headers above the events */
  listHeader: {
    paddingTop: 5,
    paddingLeft: 5,
    height: height / 18,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
  },

  /* Style for the list headers' text */
  listHeaderText: {
    fontFamily: 'Avenir',
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 10,
  },

  /* Style for the list section */
  listSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingLeft: 10,
  },

  /* Style for the list section time */
  listSectionTime: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 5,
  },

  /* Style for the list section time's text */
  listSectionTimeText: {
    width: width / 5,
    fontSize: 14,
    color: '#5D5D5C',
    fontWeight: '400',
    fontFamily: 'Avenir'
  },

  /* Style for the list section information */
  listSectionInfo: {
    //paddingTop: 10,
    flexDirection: 'column',
  },

  /* Style for the list section title */
  listSectionTitle: {
    width: width / 1.35,
    fontFamily: 'Avenir',
    fontSize: 18,
    height: 25,
    marginTop: 9,
    color: '#5D5D5C',
  },

  /* Style for the list section text */
  listSectionText: {
    width: width / 1.35,
    fontFamily: 'Avenir Next',
    fontSize: 12,
    height: 20,
    color: 'rgba(93, 93, 92, 0.7)',
    fontStyle: 'italic',
  },


    /* Style for the divider */
    divider: {
      width: 1,
      height: 25,
    },

    /* Style for the selected option */
    selectedOption: {
      height: 25,
      width: width / 6.5,
      backgroundColor: 'rgb(92, 201, 140)',
    },

    /* Style for the deselected option */
    deselectedOption: {
      height: 20,
      width: width / 6.5,
      backgroundColor: 'transparent',
    },

    /* Style for the selected option text */
    selectedOptionText: {
      paddingTop: 5,
      fontSize: 11,
      textAlign: 'center',
      color: '#444',
    },

    /* Style for the deselected option text */
    deselectedOptionText: {
      paddingTop: 5,
      fontSize: 11,
      textAlign: 'center',
      color: '#444'
    },

    /* Style for the text next to the switches */
    optionText: {
      paddingTop: 5,
      fontSize: 14,
      marginRight: 10,
      textAlign: 'center',
    },

    /* Basic flex for options - between */
    basicFlexBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    /* Basic flex for options - between */
    basicFlexBetweenOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#333',
    },

    /* Basic flex for options - around */
    basicFlexAround: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
});

AppRegistry.registerComponent('Events', () => Events);
