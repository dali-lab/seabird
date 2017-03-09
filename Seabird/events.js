import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {NavBar} from './components/navBar';
import {CustomizeList} from './components/customizeList';

const { height, width } = Dimensions.get('window');
const NAVBAR_TEXT = 'Events';

export default class Events extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tileOrder: []
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

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} type='down'/>
        <View style={styles.mainContent}>
          <Text style={styles.settingsTitle}>Customize your homepage!</Text>
          <TouchableHighlight style={styles.CTA} onPress={this.navigate.bind(this, 'eventscalendar', 'normal')}>
            <Text style={styles.CTAText}>full menus</Text>
          </TouchableHighlight>
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

AppRegistry.registerComponent('Events', () => Events);
