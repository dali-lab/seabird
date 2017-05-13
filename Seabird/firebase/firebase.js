import * as firebase from 'firebase';

class Firebase {

  /**
   * Initializes Firebase
   */
  static initialize() {
    const firebaseConfig = {
      apiKey: 'AIzaSyD_Y6hUpKekyb8LFZsPHXfyIfcwAZMvM8M',
      authDomain: 'sbackend-25143.firebaseapp.com',
      databaseURL: 'https://sbackend-25143.firebaseio.com',
      projectId: 'sbackend-25143',
      storageBucket: 'sbackend-25143.appspot.com',
      messagingSenderId: '227373370187',
    };
    firebase.initializeApp(firebaseConfig);
  }

  static getUser() {
    return firebase.auth().currentUser;
  }

  static getUserID() {
    return firebase.auth().currentUser.uid;
  }

  static isUserSignedIn(callbackFunc) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        callbackFunc(true);
        return true;
      }
        // No user is signed in
      callbackFunc(false);
      return false;
    });
  }

  // function to get firebase.database().ref(path_name)
  static getDbRef(path) {
    return firebase.database().ref(path);
  }

}

module.exports = Firebase;
