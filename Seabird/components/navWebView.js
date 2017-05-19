import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  WebView,
  Image,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';

const WEBVIEW_REF = 'webview';
const { width, height } = Dimensions.get('window');

export class NavWebView extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      canGoBack: false,
      canGoForward: false,
      url: null,
    }
  };

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
    return (
      <View style={{flex: 1}}>
      <View style={styles.topNavBar}>
        <TouchableOpacity onPress={() => this.props.navigator.pop()}>
            <Image source={require('./../Icons/cancel_icon.png')} style={styles.backIcon}/>
        </TouchableOpacity>
        <TouchableOpacity disabled={!this.state.canGoBack} onPress={this.goBack}>
            <Image source={require('./../Icons/backward_arrow.png')} style={styles.icon}/>
        </TouchableOpacity>
        <TextInput style={styles.urlStyle} value={this.props.URL}></TextInput>
        <TouchableOpacity disabled={!this.state.canGoForward} onPress={this.goForward}>
            <Image source={require('./../Icons/forward_arrow.png')} style={styles.icon}/>
        </TouchableOpacity>
      </View>
      <WebView
        ref={WEBVIEW_REF}
        style={{
          flex: 1,
        }}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        source={{
          uri: this.props.URL
        }}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Styles the web view button */
  backIcon: {
    flex: 1,
    height: 17,
    width: 17,
    resizeMode: 'center'
  },

  /* Styles the web view button */
  icon: {
    flex: 1,
    height: 20,
    width: 20,
    resizeMode: 'center'
  },

  /* Styles the forward button */
  forwardIcon: {
    flex: 1,
    height: 20,
    resizeMode: 'center'
  },

  /* Styles the bottom web view navigation banner */
  topNavBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 60,
    backgroundColor: '#EAEAEA',
  },

  /* Styles for the url in the top navigation bar */
  urlStyle: {
    color: '#555',
    fontSize: 15,
    textAlign: 'center',
    width: width / 1.8,
    height: 20,
    paddingTop: 30,
  }
});
