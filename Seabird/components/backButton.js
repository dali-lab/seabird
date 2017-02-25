import React, { Component } from 'react';
import { 
  TouchableHighlight, 
  Image 
} from 'react-native';

export class BackButton extends Component {

  navigatePop() {
    this.props.navigator.pop();
  }

  render() {
    if (this.props.type === 'down') {
      return (
        <TouchableHighlight onPress={this.navigatePop.bind(this, 'backbutton')}>
          <Image
            source={require('../Icons/Back-50-White-Down.png')}
            style={
              {
                flex: 0,
                height: 20,
                resizeMode: 'center',
              }
            }
          />
        </TouchableHighlight>
      );
    }
    else {
      return (
        <TouchableHighlight onPress={this.navigatePop.bind(this, 'backbutton')}>
          <Image
            source={require('../Icons/Back-50-White.png')}
            style={
              {
                flex: 0,
                height: 20,
                resizeMode: 'center',
              }
            }
          />
        </TouchableHighlight>
      );
    }
  }
}
