import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  WebView,
  Image,
  ListView,
  TextInput,
} from 'react-native';
import { BackButton } from './backButton';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const { width, height } = Dimensions.get('window');
const WEBVIEW_REF = 'webview';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const BACON_IPSUM = 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

const CONTENT = [
  {
    title: 'First',
    content: BACON_IPSUM,
  },
  {
    title: 'Second',
    content: BACON_IPSUM,
  },
  {
    title: 'Third',
    content: BACON_IPSUM,
  },
  {
    title: 'Fourth',
    content: BACON_IPSUM,
  },
  {
    title: 'Fifth',
    content: BACON_IPSUM,
  },
];

const SELECTORS = [
  {
    title: 'First',
    value: 0,
  },
  {
    title: 'Third',
    value: 2,
  },
  {
    title: 'None',
    value: false,
  },
];

export class ActionList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemsSource: ds.cloneWithRows([]),
      buttonText: 'Star',
      sectionVisible: false,
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = () => {
    // Fetch the data from Firebase and update the itemsSource object
    this.setState({ itemsSource: ds.cloneWithRows([1, 1, 1, 1, 1, 1, 1, 1]) });
  }

  completeAction = () => {
    // Send the new information to the database
    // Update the state of the button
    console.log('Button Pressed')
    this.setState({ buttonText: 'Pressed' });
  }

  state = {
    activeSection: false,
    collapsed: true,
  };

  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  _setSection(section) {
    this.setState({ activeSection: section });
  }

  _renderHeader(section, i, isActive) {
    return (
      <Animatable.View duration={400} style={styles.itemSectionGreen} transition="backgroundColor">
        <Text style={styles.itemTitleGreen}>{section.title}</Text>
      </Animatable.View>
    );
  }

  _renderContent(section, i, isActive) {
    return (
      <Animatable.View duration={400}  style={styles.itemSectionGreen} transition="backgroundColor">
        <Text style={styles.itemTitleGreen}>{section.content}</Text>
      </Animatable.View>
    );
  }

  renderHeader(rowData, sectionID, rowID) {
    return (
      <View />
    )
  }

  searchModules = (text) => {
    /*var searchKey = text
    if (searchKey.length > 0) {
      var updateHomeOrder = []
      for (var i = 0; i < this.props.HOME_PORTALS.length; i++) {
        if (this.props.HOME_PORTALS[i].txtName.substring(0, searchKey.length) === searchKey || this.props.HOME_PORTALS[i].navName.substring(0, searchKey.length) === searchKey) {
          updateHomeOrder.push(this.props.HOME_PORTALS[i])
        }
      }
        this.setState({ HOME_PORTALS: updateHomeOrder })
        LayoutAnimation.configureNext(CustomLayoutSpring);

    } else if (searchKey === '') {
      this.setState({ HOME_PORTALS: this.props.HOME_PORTALS })
      LayoutAnimation.configureNext(CustomLayoutSpring);
    }*/
  }

  render() {
    return (
      <View style={{ width}}>
        <View style={styles.sectionHeader}>
          <View style={styles.searchSection}>
            <TextInput
              style={styles.searchSectionInput}
              placeholder="Search Modules"
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
        </View>
        <Accordion
          activeSection={this.state.activeSection}
          sections={CONTENT}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          duration={400}
          onChange={this._setSection.bind(this)}
        />
      </View>
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

  /* Style for the entire list view */
  listSection: {
    height: height * 1.3,
  },

  /* Style for the section that will hold the sorting function */
  sectionHeader: {
    height: 80,
    backgroundColor: 'rgb(184, 240, 255)',

  },

  /* Style for the section for each item - green*/
  itemSectionGreen: {
    width: width / 1.05,
    height: height / 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 4,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgb(15, 164, 61)',
    backgroundColor: 'rgba(152, 255, 159, 0.1)',
    alignSelf: 'center',
  },

  /* Style for the section for each item - red */
  itemSectionRed: {
    width: width / 1.05,
    height: height / 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 4,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgb(227, 56, 56)',
    backgroundColor: 'rgba(227, 56, 56, 0.05)',
    alignSelf: 'center',
  },

  /* Style for the section's title for each item - green */
  itemTitleGreen: {
    marginTop: height / 38,
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Verdana',
    color: 'rgb(15, 164, 61)',
  },

  /* Style for the section's title for each item - red */
  itemTitleRed: {
    marginTop: height / 38,
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Verdana',
    color: 'rgb(227, 56, 56)',
  },

  /* Style for the section's time */
  itemTime: {
    marginTop: height / 33,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Avenir',
    color: 'rgb(15, 164, 61)'
  },

  /* Style for the section's action for each item */
  itemAction: {
    marginTop: height / 30,
  },

});
