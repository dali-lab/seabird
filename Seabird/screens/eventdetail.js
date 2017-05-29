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
  Image,
} from 'react-native';
import { NavBar } from './../components/navBar';
import Moment from 'moment';

const { height, width } = Dimensions.get('window');
const NAVBAR_TEXT = '';

export default class EventDetail extends Component {

  constructor(props) {
    super();
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
          <View style={styles.contentSection}>
          <View style={styles.firstSection}>
            <Text style={styles.eventTitle}>{this.props.currentEvent.event}</Text>
            <Text style={styles.eventLocation}>{this.props.currentEvent.location}</Text>
            <Image source={require('./../Icons/lunch.jpg')} style={styles.eventImage}/>
          </View>
          <View style={styles.secondSection}>
            <View style={styles.subLeftSection}>
              <View style={{height: 50, width: 50, backgroundColor: 'rgba(59, 116, 79, 0.43)', borderRadius: 25, flexDirection: 'column', justifyContent: 'center', marginLeft: 5, marginRight: 15}}>
                <Text style={{fontSize: 22, fontWeight: 'bold', textAlign: 'center'}}>{Moment(this.props.currentEvent.day).format('d')}</Text>
                </View>
            </View>
            <View style={styles.subRightSection}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width / 1.6}}>
                <Text style={styles.eventDate}>{Moment(this.props.currentEvent.day).format('MMMM, do YYYY')}</Text>
                <Text style={styles.eventHour}>{Moment(this.props.currentEvent.startTime).format('h:mm a')} </Text>
              </View>
              <Text style={styles.eventDay}>{Moment(this.props.currentEvent.day).format('dddd')}</Text>
            </View>
          </View>
          </View>
          {/*}<View style={{ flex: 7 }}>
            <Text style={styles.eventDate}>{Moment(this.props.currentEvent.day).format('dddd, MMMM do')}</Text>
          </View>
          <View style={{ flex: 2, flexDirection: 'row', alignSelf: 'center' }}>
            <Text style={styles.eventHour}>{Moment(this.props.currentEvent.startTime).format('h:mm A')} </Text>
            <Text style={styles.eventHour} />
            <Text style={styles.eventTitle}>{this.props.currentEvent.event}</Text>
          </View>
          <View style={{ flex: 30 }}>
            <Text style={styles.eventLocation}>{this.props.currentEvent.location}</Text>
          </View>*/}
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
    backgroundColor: '#eee',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    width,
    flex: 1,
  },

  /* Style for the section that will hold the content */
  contentSection: {
    backgroundColor: '#fff',
    width: width / 1.03,
    height: 400,
    paddingTop: 10,
    paddingLeft: 10,
  },

  /* Style for the first section in the main section */
  firstSection: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 130,
    width: width / 1.03,
    alignSelf: 'center',
  },

  /* Style for the second section in the main section */
  secondSection: {
    flexDirection: 'row',
    height: 150,
    width: width / 1.03,
  },

  /* Style for the sub section to the left */
  subLeftSection: {
    marginTop: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  /* Style for the sub section to the right */
  subRightSection: {
    marginTop: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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

  /* Style for the event's image */
  eventImage: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    alignSelf: 'flex-end',
    borderRadius: 3,
    marginRight: 15,
    marginTop: -60,
  },

  /* Style for the event's date */
  eventDate: {
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: '400',
    color: '#888',
  },

  /* Style for the event's day */
  eventDay: {
    fontSize: 18,
    fontFamily: 'Lato',
    fontWeight: '400',
    color: '#777',
  },

  /* Style for the event's time */
  eventHour: {
    fontFamily: 'Lato',
    fontSize: 14,
    fontWeight: '400',
    color: '#777',
    textAlign: 'right',
  },

  /* Style for the event's title */
  eventTitle: {
    fontFamily: 'Lato',
    fontSize: 18,
    fontWeight: '400',
    color: '#111',
    marginLeft: 10,
    width:  width / 1.7,
  },

  /* Style for the event's location */
  eventLocation: {
    fontFamily: 'Lato',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '400',
    color: '#ccc',
    marginLeft: 20,
    width: width / 1.7,
  },
});

AppRegistry.registerComponent('EventDetail', () => EventDetail);
