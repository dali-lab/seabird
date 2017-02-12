import React, { Component } from 'react';
import { Image, Animated, StyleSheet, LinkingIOS, ScrollView, ListView, View, Text, Navigator, AppRegistry, PropTypes, TouchableHighlight, WebView, TextInput, Button } from 'react-native';


var ddsLocations = ['FOCO', 'THE HOP', 'NOVACK', 'COLLIS'];
export default class Settings extends Component {
  // Initialize the hardcoded data

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid != r2.guid});
    this.state = {
      bounceValue: new Animated.Value(0),
      dataSource: dataSource.cloneWithRows(ddsLocations),
      userFirstName: '',
      userLastName: '',
      userEmail: '',
    }
  };

  navigatePop() {
    this.props.navigator.pop();
  }

  navigatePush(routeName) {
    this.props.navigator.push({
      name: routeName
    })
  }

  // renderRow(rowData, sectionID, rowID) {
  //   return (
  //     <TouchableHighlight underlayColor='#ddd' style={{height: 44}}>
  //       <View>
  //         <Text style={styles.listItem} numberOfLines={1}>{rowData}</Text>
  //         <View style={styles.divider}/>
  //       </View>
  //     </TouchableHighlight>
  //   )
  // }

  render() {
    return (
      <View style={styles.pageContent}>
        <View style={styles.mainHeader}>
          <TouchableHighlight onPress={this.navigatePop.bind(this, 'settings')}>
            <Image
              source={require('./Icons/Back-50-White.png')}
              style={styles.backIcon}
            />
          </TouchableHighlight>
          <Text style={styles.schoolTitle}>Settings</Text>
        </View>
        <View style={styles.mainContent}>
          <View style={styles.contentHeader}>
            <Text style={styles.settingsTitle}>SETTINGS</Text>

            <Text style={styles.settingsText}>First Name: </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                this.setState({userFirstName: text});
              }}
              value={this.state.userFirstName}
              placeholder="Enter your first name here"
            />

            <Text style={styles.settingsText}>Last Name: </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                this.setState({userLastName: text});
              }}
              value={this.state.userLastName}
              placeholder="Enter your last name here"
            />

            <Text style={styles.settingsText}>Email: </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                this.setState({userEmail: text});
              }}
              value={this.state.userEmail}
              placeholder="Enter your email here"
            />

            <Button
              onPress={this.navigatePush.bind(this, 'dds')}
              title="Customize"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />

          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  /* Style for the enter page */
  pageContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  /* Style for the header section that holds the school name and crest */
  mainHeader: {
    width: 400,
    height: 70,
    marginBottom: 20,
    backgroundColor: '#2b2b2b',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  /* Style for the school title text */
  schoolTitle: {
    fontSize: 23,
    fontFamily: 'System',
    fontWeight: '300',
    color: '#fff',
    letterSpacing: -0.56,
  },

  /* Styles the back button */
  backIcon: {
    flex: 0,
    height: 20,
    resizeMode: 'center',
  },

  /* Style for the main section that will hold all the of the DDS content */
  mainContent: {
    width: 350,
    height: 525,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    borderRadius: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  /* Style for the section that holds the swipe headers */
  contentHeader: {
    width: 325,
    height: 125,
    marginTop: 20,
  },

  /* Style for the intro phrase */
  settingsText: {
    fontSize: 18,
    fontFamily: 'System',
    textAlign: 'left',
  },

  /* Style for the intro phrase */
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    marginBottom: 20,
  },

  /* Style for the current meal swipe */
  settingsTitle: {
    fontSize: 28,
    fontFamily: 'System',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
  },

  /* Style for the menu option */
  oldThing: {
    fontSize: 12,
    fontFamily: 'System',
    textAlign: 'left',
    marginTop: 7,
  },

  contentInformation: {
    width: 250,
  },

  listItem: {
    fontSize: 22,
    fontFamily: 'System',
    fontWeight: '400',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },

  /* Style for the divider in the list */
  divider: {
    height: 1,
    backgroundColor: '#bbb',
  },

});

AppRegistry.registerComponent('Settings', () => Settings);
