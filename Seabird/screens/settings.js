import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  Image
} from 'react-native';
import { NavBar } from './../components/navBar';
import Firebase from '../firebase/firebase';
import Database from '../firebase/database';

require( "firebase/auth" );

let firebase = require( "firebase/app" );

const { height, width, } = Dimensions.get( 'window' );
const NAVBAR_TEXT = 'Settings';

export default class Settings extends Component {

  constructor( props )
  {
    super( props );
    this.state = {
      userFirstName: '',
      userLastName: '',
      userEmail: ''
    };
  }

  navigate(routeName, transitionType = 'normal')
  {
    this.props.navigator.push({ name: routeName, transitionType });
  }

  componentWillMount( )
  {
    Database.listenUserFirstName(( value ) =>
    {
      this.setState({ userFirstName: value });
    });
    Database.listenUserLastName(( value ) =>
    {
      this.setState({ userLastName: value });
    });
    this.setState({ userEmail: Firebase.getUser( ).email })
  }

  logoutUser = () =>
  {
    firebase.auth().signOut().then(function(){
    }).catch(function(error) {
      console.log(error)
    });
    this.navigate('login')
  };

  render()
  {
    return (
    <View style={{width}}>

      <NavBar navigator={this.props.navigator} text={NAVBAR_TEXT}/>

      <View style={{marginTop: 20, width}}>

        <Text style={styles.textHeader}>Profile</Text>

        <View style={{height: 1, width: width, backgroundColor: 'rgba(206, 206, 206, 1)'}} />

        <View style={{backgroundColor: 'rgba(241, 241, 241, 1)'}}>
          <Text style={styles.textFields}>{this.state.userEmail}</Text>
          <View style={styles.divider} />
          <Text style={styles.textFields}>{this.state.userFirstName} {this.state.userLastName}</Text>
          <View style={styles.divider} />
          <View style={{backgroundColor: 'rgba(241, 241, 241, 1)', flexDirection: 'row'}}>
            <TouchableHighlight
                underlayColor="transparent"
                onPress={() => this.navigate('edit')}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width}}>
                <Text style={styles.textFields}>Edit Profile</Text>
                <Image
                    style={{marginRight: 10, height: 20, width: 20, resizeMode: 'contain', alignSelf: 'center'}}
                    source={require('../Icons/Settings/forward_arrow.png')}
                />
              </View>
            </TouchableHighlight>
          </View>

          <View style={styles.divider} />

          <View style={{backgroundColor: 'rgba(241, 241, 241, 1)', flexDirection: 'row'}}>
            <TouchableHighlight
                underlayColor="transparent"
                onPress={() => this.logoutUser()}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width}}>
                <Text style={styles.textFields}>Logout</Text>
                <Image
                    style={{marginRight: 10, height: 20, width: 20, resizeMode: 'contain', alignSelf: 'center'}}
                    source={require('../Icons/Settings/forward_arrow.png')}
                />
              </View>
            </TouchableHighlight>
          </View>

          <View style={{height: 1, width: width, backgroundColor: 'rgba(206, 206, 206, 1)'}} />
        </View>

        <View style={{marginTop: 20}}>
        <Text style={styles.textHeader}>Privacy</Text>
        </View>

        <View style={{height: 1, width: width, backgroundColor: 'rgba(206, 206, 206, 1)'}} />

        <View style={{backgroundColor: 'rgba(241, 241, 241, 1)', flexDirection: 'row'}}>
          <TouchableHighlight
              underlayColor="transparent"
              onPress={() => this.navigate('change')}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width}}>
              <Text style={styles.textFields}>Change Password</Text>
              <Image
                  style={{marginRight: 10, height: 20, width: 20, resizeMode: 'contain', alignSelf: 'center'}}
                  source={require('../Icons/Settings/forward_arrow.png')}
              />
            </View>
          </TouchableHighlight>
        </View>

        <View style={{height: 1, width: width, backgroundColor: 'rgba(206, 206, 206, 1)'}} />

        <View style={{marginTop: 20}}>
          <Text style={styles.textHeader}>Additional Information</Text>
        </View>

        <View style={{height: 1, width: width, backgroundColor: 'rgba(206, 206, 206, 1)'}} />

        <View style={{backgroundColor: 'rgba(241, 241, 241, 1)', flexDirection: 'row'}}>
          <TouchableHighlight
              underlayColor="transparent">
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width}}>
              <Text style={styles.textFields}>About</Text>
              <Image
                  style={{marginRight: 10, height: 20, width: 20, resizeMode: 'contain', alignSelf: 'center'}}
                  source={require('../Icons/Settings/forward_arrow.png')}
              />
            </View>
          </TouchableHighlight>
        </View>

        <View style={{height: 1, width: width, backgroundColor: 'rgba(206, 206, 206, 1)'}} />

        <View style={{flexDirection: 'column', alignItems: 'center', marginTop: 50}}>
          <TouchableHighlight
              underlayColor="transparent">
              <Image
                  style={{height: height / 19, width: width / 1.3}}
                  source={require('../Icons/Settings/rectangle_button.png')}>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 15, fontFamily: 'Lato', marginTop: 8}}>
                  Customize Home Page</Text>
                </View>
              </Image>
          </TouchableHighlight>
        </View>
      </View>
    </View>

    )
  }
}

const styles = StyleSheet.create({
  textHeader: {
    marginLeft: 12,
    fontSize: 20,
    color: 'rgba(7, 128, 75, 1)',
    marginBottom: 4,
    fontFamily: 'Lato'
  },
  textFields: {
    marginLeft: 34,
    color: 'rgba(116, 116, 116, 1)',
    fontSize: 15,
    marginTop: 12,
    marginBottom: 12,
    fontFamily: 'Lato'
  },
  divider: {
    height: 1,
    width: width,
    backgroundColor: 'rgba(206, 206, 206, 1)',
    marginLeft: 34
    },
});

AppRegistry.registerComponent( 'Settings', ( ) => Settings );
