/**
 * @class Database
 */

import Firebase from './firebase';

class Database {

    /**
     * Write user data to the database.
     * @param name: User first name
     * @param last: User last name
     * @param email: User email
     * @param year: User class year
     */
  static writeUserData(name, last, email, year) {
    const userId = Firebase.getUserID();
    Firebase.getDbRef('users/' + userId).set({
      firstName: name,
      lastName: last,
      email: email,
      year: year
    });
  }


  /**
   * Get content for a portal
   * @param portalName
   */
  static getPortalContent(portalName, callbackFunc=console.log) {
    const path = `/content/${portalName}`;

    Firebase.getDbRef(path).once('value').then((snapshot) => {
      callbackFunc(snapshot.val());
    });

  }

  /**
   * Sets a users first name
   */
  static setUserFirstName(userFirstName) {
    const userID = Firebase.getUserID();
    const path = `/users/${userID}`;

      Firebase.getDbRef(path).set({firstName: userFirstName});
  }

  /**
   * Sets a users last name
   */
  static setUserLastName(userLastName) {
      const userID = Firebase.getUserID();
      const path = `/users/${userID}`;

      Firebase.getDbRef(path).set({lastName: userLastName});
  }

  /**
   * Sets a user's email
   */
  static setUserEmail(userEmail) {
    const userID = Firebase.getUserID();
    const path = `/users/${userID}`;

    Firebase.getDbRef(path).set({email: userEmail});
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
  */
  static setUserCombos(userCombos) {
    const userID = Firebase.getUserID();
    const path = `/users/${userID}/combos`;

    Firebase.getDbRef(path).set({
      combos: userCombos,
    });
  }

    /**
     * Sets a user's year
     * @param userYear: The user's year.
     */
  static setUserYear(userYear) {
    const userID = Firebase.getUserID();
    const path = `/users/${userID}`;

    Firebase.getDbRef(path).set({year: userYear});
  }

    /**
     * Sets a user's type
     * @param userType: The user's type (alum, student, professor)
     */
  static setUserType(userType) {
    const userID = Firebase.getUserID();
    const path = `/users/${userID}/type`;

    Firebase.getDbRef(path).set({type: userType});
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
     * Listen for changes to a user's email
     */
  static listenUserYear(callbackFunc) {
    const userID = Firebase.getUserID();
    const path = `/users/${userID}`;

    Firebase.getDbRef(path).once('value').then((snapshot) => {
      let year = '';
      if (snapshot.val()) {
        year = snapshot.val().year;
      }
        callbackFunc(year);
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
    const path = '/content/events';
    Firebase.getDbRef(path).orderByChild('day').on('value', (snapshot) => {
      const events = [];
      snapshot.forEach((childSnapshot) => {
        events.push(childSnapshot.val());
      });
      callbackFunc(events.reverse());
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

  /**
   * Listens for changes to the school's content
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */
  static listenContent(modulePath, callbackFunc) {
    const path = `/content/${modulePath}`;
    Firebase.getDbRef(path).once('value').then((snapshot) => {
      const moduleContents = [];
      snapshot.forEach((childSnapshot) => {
        moduleContents.push({ navName: childSnapshot.key, url: childSnapshot.val() })
      });
      callbackFunc(moduleContents);
    }, (error) => {
      console.log(error);
    });
  }

  /**
   * Listens for changes to the accordion style content
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */
  static listenContentAccordion(modulePath, callbackFunc) {
    const path = `/content/${modulePath}`;
    Firebase.getDbRef(path).once('value').then((snapshot) => {
      const moduleContents = [];
      snapshot.forEach((childSnapshot) => {
        moduleContents.push({ title: childSnapshot.key, content: childSnapshot.val() })
      });
      callbackFunc(moduleContents);
    }, (error) => {
      console.log(error);
    });
  }

  /**
   * Listens for changes in the dining locations
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */
  static listenContentDining(modulePath, callbackFunc) {
    const path = `/content/${modulePath}`;
    Firebase.getDbRef(path).once('value').then((snapshot) => {
      const moduleContents = [];
      snapshot.forEach((childSnapshot) => {
        moduleContents.push({ key: childSnapshot.key, title: childSnapshot.val().title, location: childSnapshot.val().location, time: childSnapshot.val().time, status: childSnapshot.val().status })
      });
      callbackFunc(moduleContents);
    }, (error) => {
      console.log(error);
    });
  }

}

module.exports = Database;
