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
} from 'react-native';
import {NavBar} from './components/navBar';
import {CustomizeList} from './components/customizeList';

const { height, width } = Dimensions.get('window');
const NAVBAR_TEXT = '';

export default class EventDetail extends Component {

  constructor(props) {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4']),
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('tileOrder').then((value) => {
      this.setState({tileOrder: value});
    }).done();
  }

  renderScene(route, navigator) {
    console.log(route.name)
  }

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({name: routeName, transitionType: transitionType,})
  }

  navigatePop() {
    this.props.navigator.pop();
  }

  navigatePush(routeName) {
    this.props.navigator.push({name: routeName});
  }

  renderRow = (rowData, sectionID, rowID) => {
    /* Expects items to have specific format to distinguish between date and event information */
    if (rowData == 'row 1') {
      return(
        <Text style={styles.listHeader}>{rowData}</Text>
      )
    }
    else {
      return(
        <Text style={styles.listEvents}>{rowData}</Text>
      )
    }
  }

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={this.props.data} type='down'/>
        <View style={styles.mainContent}>
          <View style={{flex: 7}}>
            <Text style={styles.eventDate}>Tuesday, February 21</Text>
          </View>
          <View style={{flex: 2, flexDirection: 'row', alignSelf: 'center'}}>
          <Text style={styles.eventHour}>5PM:</Text>
          <Text style={styles.eventHour}> </Text>
          <Text style={styles.eventTitle}>Free Ramunto's & Music</Text>
          </View>
          <View style={{flex: 30}}>
            <Text style={styles.eventLocation}>@ Trikap</Text>
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
