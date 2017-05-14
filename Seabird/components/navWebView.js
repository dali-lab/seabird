import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  WebView,
  Image,
} from 'react-native';

const WEBVIEW_REF = 'webview';

export class NavWebView extends Component  {

  onNavigationStateChange = (navState) => {
      this.setState({canGoBack: navState.canGoBack, canGoForward: navState.canGoForward, url: navState.url});
  };

  goBack = () => {
      this.refs[WEBVIEW_REF].goBack();
  };

  goForward = () => {
      this.refs[WEBVIEW_REF].goForward();
  };

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
      <WebView ref={WEBVIEW_REF} style={{
          flex: 1,
      }} onNavigationStateChange={this.onNavigationStateChange} source={{
          uri: this.props.URL
      }}/>
      <View style={styles.bottomBar}>
          <TouchableOpacity disabled={!this.canGoBack} onPress={this.goBack}>
              <Image source={require('./../Icons/Back-50-Gray.png')} style={styles.backIcon}/>
          </TouchableOpacity>
          <TouchableOpacity disabled={!this.canGoForward} onPress={this.goForward}>
              <Image source={require('./../Icons/Forward-50-Gray.png')} style={styles.backIcon}/>
          </TouchableOpacity>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /* Styles the back button */
  backIcon: {
      flex: 1,
      height: 20,
      resizeMode: 'center'
  },

  /* Styles the forward button */
  forwardIcon: {
      flex: 1,
      height: 20,
      resizeMode: 'center'
  },

  /* Styles the bottom web view navigation banner */
  bottomBar: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 50,
      backgroundColor: '#EAEAEA'
  }
});
