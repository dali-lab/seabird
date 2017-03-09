import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import Calendar from 'react-native-calendar';
import moment from 'moment';
import {NavBar} from './components/navBar';
import {CustomizeList} from './components/customizeList';

const { height, width } = Dimensions.get('window');
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
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
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
          <Calendar eventDates={['2016-07-03', '2016-07-05', '2016-07-28', '2016-07-30',]} events={[{
              date: '2016-07-04',
              hasEventCircle: {
                backgroundColor: 'powderblue'
              },
            }
          ]} scrollEnabled showControls dayHeadings={customDayHeadings} monthNames={customMonthNames} titleFormat={'MMMM YYYY'} prevButtonText={'Prev'} nextButtonText={'Next'}
          showEventIndicators
          eventDates={['2016-11-01', '2016-11-07', '2016-11-19']}
          onDateSelect={(date) => this.setState({selectedDate: date})} onTouchPrev={(e) => console.log('onTouchPrev: ', e)} onTouchNext={(e) => console.log('onTouchNext: ', e)} onSwipePrev={(e) => console.log('onSwipePrev: ', e)} onSwipeNext={(e) => console.log('onSwipeNext', e)}
          customStyle={customStyle}
          />
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
});

const customStyle = {
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
      color: 'blue',
    },
    eventIndicator: {
      backgroundColor: 'blue',
      width: 10,
      height: 10,
    },
};

AppRegistry.registerComponent('EventsCalendar', () => EventsCalendar);
