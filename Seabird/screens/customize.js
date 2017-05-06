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
} from 'react-native';
import { NavBar } from './../components/navBar';
import { CustomizeList } from './../components/customizeList';

const { height, width } = Dimensions.get('window');
const NAVBAR_TEXT = 'Customize';
import SortableGrid from 'react-native-sortable-grid';

// the y value a block is dragged to before screen scrolls up/down
// NOTE: these should be percentages of screen height
let SCROLL_UP_Y = 100;
let SCROLL_DOWN_Y = 600;

// used in the setInterval timer to track position of block being dragged
let dragTracker = null;
// used to scroll up/down slightly when dragging a block
let _scrollView: ScrollView;

export default class Customize extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scrolling: true,
      deletingPortals: false,
      portal: [],
    };
  }

  componentWillMount() {
    this.setState({ portal: this.props.HOME_PORTALS })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ portal: nextProps.HOME_PORTALS })
  }

  navigatePop() {
    this.props.navigator.pop();
  }

  navigatePush(routeName) {
    this.props.navigator.push({ name: routeName });
  }

  rearrange = (value) => {
    this.setState({ scrolling: true })
    var newHome = []
    for (var i = 0; i < this.state.portal.length; i++) {
        newHome[i] = this.state.portal[value.itemOrder[i].key]
    }
    this.props.orderChanged(newHome)
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
    // only once the dragPosition can be read
    if (this.refs.SortableGrid.dragPosition) {
      let blockY = this.refs.SortableGrid.dragPosition.y;
      console.log('y of the active block:');
      console.log(blockY);
      if ((blockY < SCROLL_UP_Y) || (blockY > SCROLL_DOWN_Y)) {
        console.log('scrolling screen');
        this.scrollScreen(blockY);
      }
    }
  }

  scrollScreen = (yVal) => {
    _scrollView.scrollTo({y: yVal});
  }

  render() {
    return (
      <View style={styles.pageContent}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} type="down" />
        <View style={styles.mainContent}>
          {this.deletePortalsButton()}
          <ScrollView
            ref={(scrollView) => { _scrollView = scrollView; }}
            scrollEnabled={this.state.scrolling}
          >
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
              {this.state.portal.map((letter, index) => (
                <View style={styles.option} key={index}>
                  <Text style={styles.optionText}>{letter.txtName}</Text>
                </View>))}
            </SortableGrid>
          </ScrollView>
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

  /* Style for the Sortable Grid */
  grid: {
    height: 30,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('Customize', () => Customize);
