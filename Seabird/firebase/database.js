/**
 * @class Database
 */

import Firebase from './firebase';

class Database {

  /**
   * Get content for a portal
   * @param portalName
   */
  static getPortalContent(portalName, callbackFunc) {
    const path = `/content/${portalName}`;

    Firebase.getDbRef(path).once('value').then((snapshot) => {
      console.log(snapshot.val());
      callbackFunc(snapshot.val());
    });

    // Firebase.getDbRef(path).once('value').then((snapshot) => {
    //   console.log(snapshot.val());
    //   return snapshot.val();
    // });
  }

  /**
   * Sets a users first name
   * @param first
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */
  static setUserFirstName(first) {
    const user = Firebase.getUser();
    const userID = Firebase.getUserID();
    const path = `/users/${userID}`;

    if (first !== null && first !== undefined) {
      // set the user's display name to be their first name
      user.updateProfile({
        displayName: first,
      });

      return Firebase.getDbRef(path).update({
        firstName: first,
      });
    }
  }

  /**
   * Sets a users last name
   * @param last
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */
  static setUserLastName(last) {
    const userID = Firebase.getUserID();
    const path = `/users/${userID}`;

    if (last !== null || last !== undefined) {
      return Firebase.getDbRef(path).update({
        lastName: last,
      });
    }
  }

  /**
   * Sets a users last name
   * @param email
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */
  static setUserEmail(email) {
    const user = Firebase.getUser();
    const userID = Firebase.getUserID();
    const path = `/users/${userID}`;

    console.log(`EMAIL: ${email}`);
    if (email !== null || email !== undefined) {
      // set the user's email address in User as well
      user.updateEmail(email).then(() => {
        // Update successful
        alert('Email updated!');
      }, (error) => {
        // An error happened
        alert('The email address is badly formatted');
        return null;
      });

      return Firebase.getDbRef(path).update({
        email: user.email,
      });
    }
  }

  /**
   * Sets a users homepage order
   * @param order
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */
  static setUserHomeOrder(order) {
    const user = Firebase.getUser();
    const userID = Firebase.getUserID();
    const path = `/users/${userID}/homeOrder`;

    Firebase.getDbRef(path).set({
      homeOrder: order,
    });
  }

  /**
  * Sets a users combos
  * @param userCombos
  * @returns {firebase.Promis<any>|!firebase.Promise.<void>}
  */
  static setUserCombos(userCombos) {
    const user = Firebase.getUser();
    const userID = Firebase.getUserID();
    const path = `/users/${userID}/combos`;

    Firebase.getDbRef(path).set({
      combos: userCombos,
    });
  }

  /**
   * Listen for changes to a user's first name
   * @param callbackFunc
   */
  static listenUserFirstName(callbackFunc) {
    const userID = Firebase.getUserID();
    const path = `/users/${userID}`;

    Firebase.getDbRef(path).once('value').then((snapshot) => {
      let firstName = '';
      if (snapshot.val()) {
        firstName = snapshot.val().firstName;
      }
      callbackFunc(firstName);
    }, (error) => {
      console.log(error);
    });
  }

  /**
   * Listen for changes to a user's last name
   * @param unc
   */
  static listenUserLastName(callbackFunc) {
    const userID = Firebase.getUserID();
    const path = `/users/${userID}`;

    Firebase.getDbRef(path).once('value').then((snapshot) => {
      let lastName = '';
      if (snapshot.val()) {
        lastName = snapshot.val().lastName;
      }
      callbackFunc(lastName);
    });
  }

  /**
   * Listen for changes to a user's last name
   * @param callbackFunc
   */
  static listenUserEmail(callbackFunc) {
    const userID = Firebase.getUserID();
    const path = `/users/${userID}`;

    Firebase.getDbRef(path).once('value').then((snapshot) => {
      let email = '';
      if (snapshot.val()) {
        email = snapshot.val().email;
      }
      callbackFunc(email);
    });
  }

  /**
   * Listen for changes to a user's home order
   * @param homeOrder
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */
  static listenUserHomeOrder(callbackFunc) {
    const userID = Firebase.getUserID();
    const path = `/users/${userID}/homeOrder`;

    Firebase.getDbRef(path).once('value').then((snapshot) => {
      let homeOrder = [];
      if (snapshot.val()) {
        homeOrder = snapshot.val().homeOrder;
      }
      callbackFunc(homeOrder);
    }, (error) => {
      console.log(error);
    });
  }

    /**
     * Listens for changes to user's combos
     * @returns {firstbase.Promise<any>|!firebase.Promise.<void>}
     */
  static listenUserCombos(callbackFunc) {
    const userID = Firebase.getUserID();
    const path = `/users/${userID}/combos`;
    Firebase.getDbRef(path).once('value').then((snapshot) => {
      let combos = [];
      if (snapshot.val()) {
        combos = snapshot.val().combos;
      }
      callbackFunc(combos);
    }, (error) => {
      console.log(error);
    });
  }

  /**
   * Listens for changes to events
   * @returns {firebase.Promis<any>|!firebase.Promise.<void>}
   */
  static listenEvents(callbackFunc) {
    const path = '/events';
    Firebase.getDbRef(path).orderByChild('key').on('value', (snapshot) => {
      const events = [];
      snapshot.forEach((childSnapshot) => {
        events.push(childSnapshot.val());
      });
      callbackFunc(events);
    }, (error) => {
      console.log(error);
    });
  }

  /**
   * Listens for changes to user's building hours
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */
  static listenUserBuildingSettings(callbackFunc) {
    const userID = Firebase.getUserID();
    const path = `/users/${userID}/buildingSettings`;
    Firebase.getDbRef(path).once('value').then((snapshot) => {
      let buildings = [];
      if (snapshot.val()) {
        buildings = snapshot.val();
      }
      callbackFunc(buildings);
    }, (error) => {
      console.log(error);
    });
  }

  /**
   * Listens for changes to the school's module directories
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */
  static listenSchoolModuleDirectories(modulePath, callbackFunc) {
    const path = `/content/moduleDirectories/${modulePath}`;
    Firebase.getDbRef(path).once('value').then((snapshot) => {
      const moduleContents = [];
      snapshot.forEach((childSnapshot) => {
        moduleContents.push(childSnapshot.val());
      });
      callbackFunc(moduleContents);
    }, (error) => {
      console.log(error);
    });
  }

}

module.exports = Database;
