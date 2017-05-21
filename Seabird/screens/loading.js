import {
    AppRegistry,
    Image,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import Firebase from '../firebase/firebase';
require( "firebase/auth" );

import React, { Component } from 'react';

const { height, width } = Dimensions.get('window');
let firebase = require( "firebase/app" );

export default class Loading extends Component {


    navigate(routeName, transitionType = 'normal') {
        this.props.navigator.push({ name: routeName, transitionType });
    }

    userIsSignedIn = (flag) => {
      if (flag) {
        this.props.navigator.push({name: 'root'});
        console.log('logged in')
      }
      else {
          this.props.navigator.push({name: 'login'});
          console.log('not logged in')
      }
    };

    componentWillMount() {
      Firebase.isUserSignedIn(this.userIsSignedIn);
      console.log('checking firebase')
      }

    render( ) {
        return (
            <Image
                source={require('../Icons/Login/gradient_background.png')}
                style={styles.gradientBackground}>
                <ActivityIndicator
                    style={[styles.centering]}
                    size="large"
                    color="white"
                />
            </Image>
        );
    }
}

const styles = StyleSheet.create({

    // Style for main background image.
    gradientBackground: {
        height,
        width,
        resizeMode: 'stretch',
        flexDirection: 'column',
        alignItems: 'center',
    },

    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        height: height
    },
});
AppRegistry.registerComponent( 'Loading', ( ) => Loading );
