import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Image,
  TextInput,
} from 'react-native';
import { NavBar } from './../components/navBar';
import Database from '../firebase/database';

const { height, width } = Dimensions.get( 'window' );
const NAVBAR_TEXT = 'Change Password';

export default class Edit extends Component
{

  navigate( routeName, transitionType = 'normal' )
  {
    this.props.navigator.push({ name: routeName, transitionType, });
  }

  render( )
  {
    return (
      <View>

        <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT}/>

        <View style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 50,
        }}>

          <Text style={styles.textHeader}>Current Password</Text>
          <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 40,
          }}>
            <TextInput style={styles.userText} secureTextEntry={true} ref="Current Password" placeholder="enter information" selectionColor='rgba(0, 0, 0, 100)'></TextInput>
          </View>

          <Text style={styles.textHeader}>New Password</Text>
          <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 50,
          }}>
            <TextInput secureTextEntry={true} style={styles.userText} ref="New Password" placeholder="enter information" onChangeText={userFirstName => this.setState({ userFirstName })} selectionColor='rgba(0, 0, 0, 100)'></TextInput>
          </View>

          <TouchableHighlight underlayColor="transparent">
            <Image style={{
              height: height / 19,
              width: width / 1.6,
            }} source={require( '../Icons/Settings/rectangle_button.png' )}>
              <View style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 15,
                  fontFamily: 'Lato',
                  marginTop: 8,
                }}>
                  Save Changes</Text>
              </View>
            </Image>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 18,
    color: 'rgba(7, 128, 75, 100)',
    marginBottom: 4,
    fontFamily: 'Lato',
    fontWeight: 'bold',
  },
  textFields: {
    width: width / 1.6,
    height: height / 21,
    resizeMode: 'stretch'
  },
  userText: {
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'Lato',
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#979797",
    borderRadius: 6,
    width: width / 1.6,
    height: height / 21,
    color: 'rgba(0, 0, 0, 100)',
  },
});

AppRegistry.registerComponent( 'Change', ( ) => Change );
