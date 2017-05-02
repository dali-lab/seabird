import React, { Component } from 'react';
import {
    TouchableHighlight,
    Image,
} from 'react-native';

export class HomeButton extends Component {

    navigate(routeName, transitionType = 'normal') {
        this.props.navigator.push({ name: routeName, transitionType})
    }

    render() {
        return (
      <TouchableHighlight underlayColor='transparent' onPress={this.navigate.bind(this, 'root')}>
        <Image
        source={require('/Users/ricardotaboada/Desktop/seabird/Seabird/Icons/home_button.png')}
        style={{
          height: 50,
          width: 50,
          marginTop: -18,
          marginRight: 4,
        }}
        />
      </TouchableHighlight>
    );
  }
}

