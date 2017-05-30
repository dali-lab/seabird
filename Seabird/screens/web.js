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

  onNavigationStateChange = (navState) => {
    this.setState({
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward,
      url: navState.url
    });
  };

  goBack = () => {
    this.refs[WEBVIEW_REF].goBack();
  };

  goForward = () => {
    this.refs[WEBVIEW_REF].goForward();
  };

  render() {
    if (this.state.portalContent == null) {
      // still waiting for response from the database
      return null;
    }
    // once the database has given us the contents of this portal...
    url = this.state.portalContent.url;
    navbarText = this.state.portalContent.title;
    console.log(this.props.url);
    return (
      <View style={styles.container}>
        <NavBar navigator={this.props.navigator} text={this.props.title} />
        <WebView
          ref={WEBVIEW_REF}
          style={{
            flex: 1,
          }}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          source={{
            uri: this.props.url
          }}
        />
        {/*}<NavWebView style={{flex: 1}} source={{ uri: this.props.url }} ref={WEBVIEW_REF} URL={this.props.url}/>*/}
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
