import React, { Component } from 'react';
import {
    TouchableHighlight,
    Image,
    StyleSheet,
} from 'react-native';

export class HomeButton extends Component {

  navigate(routeName, transitionType = 'normal') {
    this.props.navigator.push({ name: routeName, transitionType });
  }

  render() {
    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.navigate.bind(this, 'root')}>
        <Image
          source={require('./../Icons/home_button.png')}
          style={styles.homeImage}
        />
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  /* Style for the home button image */
  homeImage: {
    height: 50,
    width: 50,
    marginTop: -23,
    marginRight: 4,
  },
});
