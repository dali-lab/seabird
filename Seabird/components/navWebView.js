import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  WebView,
  Image,
  Text,
  Dimensions,
} from 'react-native';

const WEBVIEW_REF = 'webview';
const { width, height } = Dimensions.get('window');

export class NavWebView extends Component  {

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
            <Image source={require('./../Icons/Back-50-Gray.png')} style={styles.backIcon}/>
        </TouchableOpacity>
          <TouchableOpacity disabled={!this.canGoBack} onPress={() => this.goBack}>
              <Image source={require('./../Icons/Back-50-Gray.png')} style={styles.backIcon}/>
          </TouchableOpacity>
          {/*<Text style={styles.urlStyle}>{this.props.URL}</Text>*/}
          <Text style={styles.urlStyle}>canvas.dartmouth.edu</Text>
          <TouchableOpacity disabled={!this.canGoForward} onPress={() => this.goForward}>
              <Image source={require('./../Icons/Forward-50-Gray.png')} style={styles.backIcon}/>
          </TouchableOpacity>
      </View>
      <WebView ref={WEBVIEW_REF} style={{
          flex: 1,
      }} onNavigationStateChange={this.onNavigationStateChange.bind(this)} source={{
          uri: this.props.URL
      }}/>
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
  topNavBar: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: 60,
      backgroundColor: '#EAEAEA',
  },

  /* Styles for the url in the top navigation bar */
  urlStyle: {
    color: '#555',
    fontSize: 15,
    textAlign: 'center',
    width: width / 1.8
  }
});
