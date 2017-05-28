import React, { Component } from 'react';
import {
    TouchableHighlight,
    Image,
    StyleSheet,
} from 'react-native';

export class HomeButton extends Component {

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({ name: routeName,
      transitionType: 'floatLeft',
      sceneConfig: {
        gestures: {},
      } });
  }

  render() {
    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.navigate.bind(this, 'root')}>
        <Image
          source={require('./../Icons/Components/home_icon.png')}
          style={styles.homeImage}
        />
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  /* Style for the home button image */
  homeImage: {
    height: 21,
    width: 21,
    resizeMode: 'contain',
    marginRight: 15

  },
});
