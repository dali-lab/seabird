import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';

export class SearchBar extends Component {

  navigatePop() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={this.props.searchSectionStyle}>
        <TextInput
          style={this.props.searchInputStyle}
          placeholder={this.props.placeholder}
          placeholderTextColor='rgba(255, 255, 255, 0.8)'
          selectionColor="white"
          onChangeText={(text) => {
            if (this.props.onChangeText) {
              this.props.onChangeText(text);
            }
          }}
        />
        <TouchableHighlight
          ref="SearchBar"
          underlayColor="transparent"
          style={this.props.searchButtonStyle}
          onPress={() => console.log('Pressed search')}
        >
          <Image
            style={this.props.searchIconStyle} source={require('./../Icons/search_icon.png')}
            />
        </TouchableHighlight>
      </View>
    )
  }
}
