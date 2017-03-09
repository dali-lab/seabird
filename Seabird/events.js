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
const NAVBAR_TEXT = 'Events';

export default class Events extends Component {

  constructor(props) {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4', 'row 1', 'row 2', 'row 3', 'row 4']),
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('tileOrder').then((value) => {
      this.setState({tileOrder: value});
    }).done();
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
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} type='down'/>
        <View style={styles.mainContent}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
          <TouchableHighlight style={styles.CTA} onPress={this.navigate.bind(this, 'eventscalendar', 'normal')}>
            <Text style={styles.CTAText}>Calendar View</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  /* Style for the main section that will hold all the of the DDS content */
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
  },

  /* Styles for the list headers above the events */
  listHeader: {
    height: height / 25,
    backgroundColor: '#d5d5d5'
  },

  /* Styles for the list events */
  listEvents: {
    height: height / 11,
    backgroundColor: 'white',
    fontSize: 22,
    borderBottomWidth: 2,
    borderBottomColor: '#d5d5d5',
  },
});

AppRegistry.registerComponent('Events', () => Events);
