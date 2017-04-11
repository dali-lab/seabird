import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Animated,
    WebView,
} from 'react-native';
import { NavBar } from './components/navBar';
import { NavWebView } from './components/navWebView';

const WEBVIEW_REF = 'webview';
const URL = 'http://thedartmouth.com';
const NAVBAR_TEXT = 'News';

export default class News extends Component {
    // Initialize the hardcoded data

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT} />
        <NavWebView source={{ uri: URL }} ref={WEBVIEW_REF} />
        {/* <WebView ref={WEBVIEW_REF} style={{
                    flex: 1,
                    marginTop: -2
                }} onNavigationStateChange={this.onNavigationStateChange.bind(this)} source={{
                    uri: URL
                }}/>
                <View style={styles.bottomBar}>
                    <TouchableOpacity disabled={!this.state.canGoBack} onPress={this.goBack}>
                        <Image source={require('./Icons/Back-50-Gray.png')} style={styles.backIcon}/>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!this.state.canGoForward} onPress={this.goForward}>
                        <Image source={require('./Icons/Forward-50-Gray.png')} style={styles.backIcon}/>
                    </TouchableOpacity>
                </View>*/}

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

AppRegistry.registerComponent('News', () => News);
