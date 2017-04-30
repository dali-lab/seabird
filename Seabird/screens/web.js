import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Animated,
    WebView,
} from 'react-native';
import { NavBar } from './../components/navBar';
import { NavWebView } from './../components/navWebView';
import Database from '../firebase/database';

const WEBVIEW_REF = 'webview';
const PORTAL_NAME = 'portal1';

// this is all updated by pulling from the database
let portalContent = null;
let url = null;
let navbarText = null;

export default class Web extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
      portalContent: null,
    };
    // this.portalContent = Database.getPortalContent('portal1');
  }

  componentDidMount() {
    // gets the content (url, title, etc) for this portal from the database
    Database.getPortalContent(PORTAL_NAME, (value) => {
      this.setState({ portalContent: value });
    });
  }

  render() {
    if (this.state.portalContent == null) {
      // still waiting for response from the database
      return null;
    }
    // once the database has given us the contents of this portal...
    url = this.state.portalContent.url;
    navbarText = this.state.portalContent.title;
    return (
      <View style={styles.container}>
        <NavBar navigator={this.props.navigator} text={navbarText} />
        <NavWebView source={{ uri: url }} ref={WEBVIEW_REF} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    /* Styles the entire container to hold multiple views */
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('Web', () => Web);
