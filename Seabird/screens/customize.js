import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Dimensions,
  ScrollView,
  Button,
  PixelRatio,
  ListView,
  TouchableHighlight,
  Image,
} from 'react-native';
import Hr from 'react-native-hr';
import { NavBar } from './../components/navBar';
import { TileCustomize } from '../components/tileCustomize';
import { ButtonSwitches } from './../components/buttonSwitches';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';

const { height, width } = Dimensions.get('window');
const NAVBAR_TEXT = 'Customize';
import SortableGrid from '../components/react-native-sortable-grid/index';

let MODULE_FONT_SIZE = 18;
let MODULE_TEXT_PADDING = 0;
let TILE_WIDTH = width / 3.3;
let TILE_HEIGHT = height / 6;
let TILE_COLOR = '#188E65';


if (PixelRatio.get() <= 2) {
  MODULE_FONT_SIZE = 15;
  MODULE_TEXT_PADDING = -2;
  TILE_WIDTH = width / 3.6;
  TILE_HEIGHT = height / 6.5;
}

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

// the y value a block is dragged to before screen scrolls up/down
// NOTE: these should be percentages of screen height
let SCROLL_UP_Y = 100;
let SCROLL_DOWN_Y = 550;

// height of 6 tiles
let HEIGHT_OF_6TILES = TILE_HEIGHT*5.1; //560;

// used in the setInterval timer to track position of block being dragged
let dragTracker = null;
// used to scroll up/down slightly when dragging a block
let _scrollView: ScrollView;
var newHome = []
export default class Customize extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scrolling: true,
      deletingPortals: false,
      activePortals: [],
      allPortals: [],
      activePortalNames: [],
      allPortalNames: [],
      view: 1,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => true,
      }).cloneWithRows([1, 1, 1, 1]),
    };
    this.scrollY = 0;
  }

  componentWillMount() {
    this.readPortals();
  }

  readPortals = () => {
    Database.listenUserHomeOrder((value) => {
      console.log('component will mount / listen home order');
      let portals = JSON.parse(value);
      this.setState({ activePortals: portals})
      let activePortalNames = [];
      for (i=0; i<portals.length; i++) {
        activePortalNames.push(portals[i].txtName);
      }
      this.setState({
        activePortalNames: activePortalNames
      })
    });
    Database.getPortalContent('allModules', ( value ) => {
      let portals = JSON.parse(value.studentHomeOrder);
      this.setState({ allPortals: portals });
      let allPortalNames = [];
      for (i=0; i<portals.length; i++) {
        allPortalNames.push(portals[i].txtName);
      }
      this.setState({
        allPortalNames: allPortalNames
      })
    });
  }

  componentWillReceiveProps(nextProps) {
    Database.listenUserHomeOrder((value) => {
      this.setState({ activePortals: JSON.parse(value)})
      Database.setUserHomeOrder(value);
    })
  }

  navigatePop() {
    this.props.navigator.pop();
  }

  componentWillUnmount() {
    if (newHome.length > 0) {
      this.props.orderChanged(newHome)
    }
  }

  navigatePush(routeName) {
    this.props.navigator.push({ name: routeName });
  }

  rearrange = (value) => {
    this.setState({ scrolling: true });
    for (var i = 0; i < this.state.activePortals.length; i++) {
        newHome[i] = this.state.activePortals[value.itemOrder[i].key]
    }

  }

  toggleDeletePortals = () => {
    this.refs.SortableGrid.toggleDeleteMode();
    this.setState({deletingPortals: !(this.state.deletingPortals)});
  }

  deletePortalsButton = () => {
    if (this.state.deletingPortals) {
      return ( <Button onPress={this.toggleDeletePortals} title="Done" color="#841584" /> );
    }
    return ( <Button onPress={this.toggleDeletePortals} title="Delete Portals" color="#841584" /> );
  }

  // activated by setInterval timer
  dragging = () => {
    if (this.state.scrolling) {
      this.refs.SortableGrid.setViewIsScrolling(true);
    }
    else {
      this.refs.SortableGrid.setViewIsScrolling(false);
    }
    // only once the dragPosition can be read
    if (this.refs.SortableGrid.dragPosition) {
      let blockY = this.refs.SortableGrid.dragPosition.y;
      if (blockY < SCROLL_UP_Y) {
        console.log('scrolling screen up');
        this.scrollScreen(-20);
      }
      else if (blockY > SCROLL_DOWN_Y) {
        console.log('scrolling screen down');
        this.scrollScreen(20);
      }
    }
  }

  handleScroll = (event) => {
    this.scrollY = event.nativeEvent.contentOffset.y;
  }

  scrollScreen = (yDelta) => {
    let yVal = this.scrollY + yDelta;
    let blockY = this.refs.SortableGrid.dragPosition.y + 20 + this.refs.SortableGrid.activeBlockOffset.y;
    this.refs.SortableGrid._getActiveBlock().currentPosition.y.setValue(blockY);
    _scrollView.scrollTo({y: yVal});
  }

  pageBars = () => {

    let numBars = Math.floor((this.state.activePortals.length-1)/6);
    let bars = [];

    for (let i = 1; i <= numBars; i++) {
      bars.push(
        <View key={i} style={styles.barHolderView} top={HEIGHT_OF_6TILES*i+5}>
          <Hr lineColor='rgba(66, 159, 109, 100)' text={ `page ${i+1}` } textColor='rgba(66, 159, 109, 100)' />
        </View>
      );
    }

    return (
      bars
    );
  }

  firstSwitchAction = () => {
    this.setState({
      view: 1,
    })
  }

  secondSwitchAction = () => {
    // console.log(this.state.activePortals)
    console.log(this.state);
    // let allPortals = [];
    // for (i in this.state.allPortals) {
    //   allPortals.push({
    //     name: i,
    //     checked: this.state.allPortals[i]
    //   });
    // }
    let allPortalsSorted = this.state.allPortals;
    allPortalsSorted.sort(function(a, b){
      if(a.txtName < b.txtName) return -1;
      if(a.txtName > b.txtName) return 1;
      return 0;
    });
    this.setState({
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => true,
      }).cloneWithRows(allPortalsSorted),
      view: 2,
    })
  }

  deactivatePortal = (txtName) => {
    // remove portal name from the list of active portals
    let activePortalNames = this.state.activePortalNames;
    let idx = activePortalNames.indexOf(txtName);
    if (idx > -1) {
      activePortalNames.splice(idx, 1);
    }
    this.setState({
      activePortalNames: activePortalNames
    })

    // remove portal from all active portals
    let activePortals = this.state.activePortals;
    for (idx in activePortals) {
      if (activePortals[idx].txtName == txtName) {
        activePortals.splice(idx, 1);
      }
    }
    this.setState({
      activePortals: activePortals
    })
    Database.setUserHomeOrder(JSON.stringify(activePortals));
    this.readPortals();
  }

  activatePortal = (txtName) => {
    // add portal name to the list of active portals
    let activePortalNames = this.state.activePortalNames;
    activePortalNames.push(txtName);
    this.setState({
      activePortalNames: activePortalNames
    })

    // add portal to all active portals
    let allPortals = this.state.allPortals;
    let activePortals = this.state.activePortals;
    for (idx in allPortals) {
      if (allPortals[idx].txtName == txtName) {
        activePortals.push(allPortals[idx]);
      }
    }
    this.setState({
      activePortals: activePortals
    })
    Database.setUserHomeOrder(JSON.stringify(activePortals));
    this.readPortals();
  }

  displayItems = () => {
    if (this.state.view == 1) {
      return (
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          scrollEnabled={this.state.scrolling}
          scrollEventThrottle={100}
          onScroll={this.handleScroll}
          horizontal={false}
          height={height/1.4}
        >
          <View style={styles.barHolderView}>
            <Hr lineColor='rgba(66, 159, 109, 100)' text='page 1' textColor='rgba(66, 159, 109, 100)' />
          </View>
          <View style={styles.floatingView}>
            {this.pageBars()}
          </View>

          <SortableGrid
            itemsPerRow={2}
            dragActivationTreshold={300}
            onDragStart={() => {
              dragTracker = setInterval(this.dragging, 100);
              this.setState({ scrolling: false });
            }}
            onDragRelease={(itemOrder) => {
              clearInterval(dragTracker);
              this.rearrange(itemOrder);
            }}
            style={styles.grid}
            ref={'SortableGrid'}
          >
            {this.state.activePortals.map((letter, index) => (
              <View style={styles.tileView} key={index}>
                 <TileCustomize
                   key={index}
                   navName={letter.navName}
                   imgSource={letter.imgName}
                   text={letter.txtName}
                   tileStyle={styles.tile}
                   textStyle={styles.tileText}
                 />
               </View>
            ))}
          </SortableGrid>
        </ScrollView>
      );
    }
    else {
      // note that the key of ListView is set to random to force a rerender of each row
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <ListView
            key={Math.random()}
            scrollEnabled={true}
            style={styles.section}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      );
    }
  }

  renderRow = (rowData, sectionID, rowID) => {
    let portalIsActive = (this.state.activePortalNames.indexOf(rowData.txtName) >= 0);
    if (portalIsActive) {
      return (
        <View>
          <TouchableHighlight underlayColor="transparent" onPress={() => this.deactivatePortal(rowData.txtName)}>
            <View style={styles.rowSection}>
              <View style={styles.circleFilled} />
              <Text style={styles.sectionText}>{rowData.txtName}</Text>
            </View>
          </TouchableHighlight>
          <View key={rowID} style={styles.separator} />
        </View>
      )
    }
    else {
      return (
        <View>
          <TouchableHighlight underlayColor="transparent" onPress={() => this.activatePortal(rowData.txtName)}>
            <View style={styles.rowSection}>
              <View style={styles.circleOpen} />
              <Text style={styles.sectionText}>{rowData.txtName}</Text>
            </View>
          </TouchableHighlight>
          <View key={rowID} style={styles.separator} />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} type="down" />
        <View style={styles.mainContent}>
          <ButtonSwitches firstOption="My Portals" secondOption="All Portals" firstAction={this.firstSwitchAction.bind(this)} secondAction={this.secondSwitchAction.bind(this)}/>
          {/*<View style={styles.basicFlexAround}>
            <SortSwitch title="PORTALS" firstOption="Rearrange" secondOption="Enable"/>
=======
          <View style={styles.basicFlexAround}>
          <ButtonSwitches firstOption="Rearrange" secondOption="Delete" secondAction={this.deletePortalsButton.bind(this)} />
>>>>>>> 13dfe6630d1dcc7fdd5a6874e526475bfd5f0b7c
          </View>
          {this.deletePortalsButton()}*/}
          {this.displayItems()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Style for the enter page */
  pageContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  /* Styles the back button */
  backIcon: {
    flex: 0,
    height: 20,
    resizeMode: 'center',
  },

  /* Style for the main section that will hold all the of the DDS content */
  mainContent: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width,
    height: height / 1.1,
  },

  /* Style for the section that holds the swipe headers */
  contentHeader: {
    width: 325,
    height: 125,
    marginTop: 20,
    backgroundColor: 'red',
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
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },

  contentInformation: {
    width,
  },

  settingsList: {
    padding: 25,
    backgroundColor: '#FBFBFB',
    borderBottomWidth: 1,
    borderColor: '#eee',
    width,
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

  /* Style for the options for the customized tiles */
  option: {
    justifyContent: 'center',
    borderRadius: 5,
    width: width / 2.5,
    height: height / 4.5,
    backgroundColor: 'white',
    backgroundColor: '#ddd',
    alignSelf: 'center',
  },

  /* Style for the options' text */
  optionText: {
    fontSize: 12,
    textAlign: 'center',
  },

  /* Style for the floating view to hold the dividers text */
  floatingView: {
    zIndex: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Style for the floating dividers bar */
  barHolderView: {
    zIndex: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    height: 20,
  },

  /* Style for the Sortable Grid */
  grid: {
    backgroundColor: 'white',
  },

  /* Style for the tiles for the home screen */
  tileView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: TILE_WIDTH*1.5,
    height: TILE_HEIGHT*1.5,
    paddingBottom: 20,
    marginTop: - width / 15,
    margin: width / 25,
  },

  /* Style for the tiles for the home screen */
  tile: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    paddingBottom: 20,
    marginTop: width / 60,
    margin: width / 25,
    borderRadius: (width / 2.8) / 2,
    borderWidth: 2,
    borderColor: TILE_COLOR,
  },

  /* Style for the tiles' text for the home screen */
  tileText: {
    paddingTop: MODULE_TEXT_PADDING,
    fontSize: MODULE_FONT_SIZE,
    fontFamily: 'Avenir-Book',
    fontWeight: '500',
    textAlign: 'center',
    color: TILE_COLOR,
  },

  /* Basic flex for options - around */
  basicFlexAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  /* Style for the section of the list view */
  rowSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 60,
  },

  /* Style for the text of the section of the list view */
  sectionText: {
    paddingLeft: width / 30,
    fontSize: 25,
    fontFamily: 'Avenir',
    color: '#136B3D',
    marginTop: 15,
  },

  /* Style for the section separators */
  separator: {
    width: width / 1.1,
    height: 1,
    alignSelf: 'flex-end',
    backgroundColor: '#CFE0D8',
  },

  /* Style for the section's button */
  sectionButton: {
    flex: 0,
    height: 20,
    width: 20,
    marginRight: 15,
    marginTop: 20,
  },

  /* filled circle shape */
  circleFilled: {
    flex: 0,
    height: 20,
    width: 20,
    marginLeft: 15,
    marginTop: 20,
    borderRadius: 20/2,
    backgroundColor: '#136B3D'
  },

  /* open circle shape */
  circleOpen: {
    flex: 0,
    height: 20,
    width: 20,
    marginLeft: 15,
    marginTop: 20,
    borderRadius: 20/2,
    borderWidth: 1,
    borderColor: '#136B3D',
    backgroundColor: 'transparent'
  },

});

AppRegistry.registerComponent('Customize', () => Customize);
