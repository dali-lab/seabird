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
  ScrollView,
} from 'react-native';
import { BackButton } from './backButton';
import { SortSwitch } from './sortSwitch';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const { width, height } = Dimensions.get('window');
const WEBVIEW_REF = 'webview';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export class ActionList extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid != r2.guid,
    });
    this.state = {
      items: [],
      constDataSource: [],
      dataSource: [],
      buttonText: 'Star',
      sectionVisible: false,
      firstPressStatus: true,
      secondPressStatus: false,
      thirdPressStatus: true,
      fourthPressStatus: false,
    };
  }

  componentWillMount() {
    Database.listenContentAccordion("buildings", (value) => {
        this.setState({ constDataSource: value, dataSource: value })
    })
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
      <Animatable.View duration={400}  style={styles.itemContent} transition="backgroundColor">
        <Text style={styles.itemContentText}>{section.content}</Text>
      </Animatable.View>
    );
  }

  searchModules = (text) => {
    var searchKey = text
    if (searchKey.length > 0) {
      var updateActionList = []
      for (var i = 0; i < this.state.constDataSource.length; i++) {
        if (this.state.constDataSource[i].title.substring(0, searchKey.length).toUpperCase() === searchKey.toUpperCase()) {
          updateActionList.push(this.state.constDataSource[i])
        }
      }
        this.setState({ dataSource: updateActionList })

    } else if (searchKey === '') {
      this.setState({ dataSource: this.state.constDataSource })
    }
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
              selectionColor="#fff"
              onChangeText={(text) => {
                this.setState({ searchText: text });
                this.searchModules(text);
              }}
            />
            <TouchableHighlight
              ref="SearchBar"
              underlayColor="transparent"
              style={styles.searchSectionButton}
            >
              <Image
                style={styles.searchIcon} source={require('./../Icons/search_icon.png')}
                />
            </TouchableHighlight>
          </View>
            <SortSwitch title="SORT" firstOption="Category" secondOption="Alphabet"/>
            <SortSwitch title="FILTER" firstOption="All" secondOption="Starred"/>
        </View>
        <ScrollView>
        <Text style={styles.listContentHeader}>Food</Text>
        <Accordion
          underlayColor="transparent"
          activeSection={this.state.activeSection}
          sections={this.state.dataSource}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          duration={400}
          onChange={this._setSection.bind(this)}
        />
        </ScrollView>
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
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
  },

  /* Style for the search bar */
  searchSectionInput: {
    width: width / 1.6,
    height: 40,
    color: '#fff',
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
    flexDirection: 'column',
    justifyContent: 'center',
    height: 180,
    backgroundColor: 'rgb(191, 222, 205)',

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
    backgroundColor: 'rgba(0, 89, 9, 0.8)',
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
    color: '#fff',
  },

  /* Style for the section's title for each item - red */
  itemTitleRed: {
    marginTop: height / 38,
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Verdana',
    color: 'rgb(227, 56, 56)',
  },

  /* Style for the section under the item */
  itemContent: {
    width: width / 1.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 4,
    padding: 10,
    borderRadius: 3,
    backgroundColor: 'rgba(61, 134, 68, 0.3)',
    alignSelf: 'center',
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

  /* Style for the title above the list */
  listContentHeader: {
    fontFamily: 'Arial',
    fontSize: 26,
    fontWeight: 'bold',
    color: 'rgb(113, 207, 119)',
    margin: 15,
  },

  /* Basic flex for options - around */
  basicFlexAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
