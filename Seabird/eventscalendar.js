import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions
} from 'react-native';
import Calendar from 'react-native-calendar';
import moment from 'moment';
import {NavBar} from './components/navBar';
import {CustomizeList} from './components/customizeList';

const {height, width,} = Dimensions.get('window');
const NAVBAR_TEXT = 'Events';
const customDayHeadings = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];
const customMonthNames = [
  'January',
  'Feburary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default class EventsCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment().format()
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('tileOrder').then((value) => {
      this.setState({tileOrder: value});
    }).done();
  }

  navigatePop() {
    this.props.navigator.pop();
  }

  navigatePush(routeName) {
    this.props.navigator.push({name: routeName});
  }

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} type='down'/>
        <View style={styles.mainContent}>
          <Calendar
          /* Call any API related function to get event dates and times */
            eventDates={['2017-03-16', '2017-03-16']}
            /*events={[{
              date: '2017-03-16',
              hasEventCircle: {
                backgroundColor: 'powderblue'
              }
            }
          ]}*/
            scrollEnabled
            showControls
            dayHeadings={customDayHeadings}
            monthNames={customMonthNames}
            titleFormat={'MMMM YYYY'}
            prevButtonText={'Prev'}
            nextButtonText={'Next'}
            showEventIndicators
            onDateSelect={(date) => this.setState({ selectedDate: date })}
            weekStart={0}
            onTouchPrev={(e) => console.log('onTouchPrev: ', e)} onTouchNext={(e) => console.log('onTouchNext: ', e)} onSwipePrev={(e) => console.log('onSwipePrev: ', e)} onSwipeNext={(e) => console.log('onSwipeNext', e)} customStyle={customStyle}
            />
        </View>
        <View style={styles.eventContent}>
          <Text>Howdy this is a test</Text>
        </View>
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
  },

  /* Style for the events container that holds the information */
  eventContent: {

  },
});

const customStyle = {
  calendarHeading: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    height: height / 15,
  },
  calendarContainer: {
    backgroundColor: 'white',
  },
  controlButtonText: {
    color: 'blue',
  },
  currentDayCircle: {
    backgroundColor: 'blue',
  },
  currentDayText: {
    color: 'blue',
  },
  dayHeading: {
    color: '#00713A',
  },
  weekendHeading: {
    color: '#00713A',
  },
  eventIndicator: {
    backgroundColor: 'blue',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  weekRow: {
    height: height / 10,
  },
  weekendDayText: {
    color: 'black',
  },

};

AppRegistry.registerComponent('EventsCalendar', () => EventsCalendar);
