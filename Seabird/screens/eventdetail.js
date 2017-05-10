import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions,
  TouchableHighlight,
  ListView,
} from 'react-native';
import { NavBar } from './../components/navBar';
import { CustomizeList } from './../components/customizeList';
import Moment from 'moment';

const { height, width } = Dimensions.get('window');
const NAVBAR_TEXT = '';

export default class EventDetail extends Component {

  constructor(props) {
    super();
  }

  componentWillMount() {
  }

  renderScene(route, navigator) { }

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({ name: routeName, transitionType });
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
        <NavBar navigator={this.props.navigator} text="Event" />
        <View style={styles.mainContent}>
          <View style={{ flex: 7 }}>
            <Text style={styles.eventDate}>{Moment(this.props.currentEvent.day).format('dddd, MMMM do')}</Text>
          </View>
          <View style={{ flex: 2, flexDirection: 'row', alignSelf: 'center' }}>
            <Text style={styles.eventHour}>{Moment(this.props.currentEvent.startTime).format('h:mm A')} </Text>
            <Text style={styles.eventHour} />
            <Text style={styles.eventTitle}>{this.props.currentEvent.event}</Text>
          </View>
          <View style={{ flex: 30 }}>
            <Text style={styles.eventLocation}>{this.props.currentEvent.location}</Text>
            {/* This is where we would add the event tags */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  pageContent: {
    flex: 1,
    backgroundColor: 'white',
  },

  /* Style for the main section that will hold all the of the content */
  mainContent: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1,
  },

  /* Style for the header section that holds the school name and crest */
  mainHeader: {
    width,
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

  /* Style for the event's date */
  eventDate: {
    marginTop: height / 20,
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
  },

  /* Style for the event's time */
  eventHour: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00713A',
  },

  /* Style for the event's title */
  eventTitle: {
    fontSize: 22,
    fontWeight: '400',
  },

  /* Style for the event's location */
  eventLocation: {
    textAlign: 'center',
    marginLeft: -(width / 1.7),
  },
});

AppRegistry.registerComponent('EventDetail', () => EventDetail);
