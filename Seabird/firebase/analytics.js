/**
 * @class Analytics
 */

import Firebase from './firebase';
// var analytics = require('react-native-firebase-analytics');
// import * as analytics from 'react-native-firebase-analytics'
var analytics = require('react-native-firebase-analytics');

class Analytics {

  static setUserID() {
    console.log(analytics);
    analytics.setUserId(Firebase.getUserID());
  }


}

module.exports = Analytics;
