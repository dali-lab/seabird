import React, { Component } from 'react';
import { NavBar } from './components/navBar';


// returns all the dining hours
export function apiGetDiningHours(codes) {
  const output = new Promise(
    (resolve, reject) => {
      ddsLocations = [];
      fetch('https://secret-dusk-76389.herokuapp.com/users')
      .then(response => response.json())
      .then((responseJson) => {
        console.log('responseJson');
        console.log(responseJson);
        resolve(ddsLocations);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    },
  );
  return output;
}

// Send a POST request to store user image in the database
export function apiSaveSchedule() {
  fetch('http://localhost:3000/api/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstParam: 'yourValue',
      secondParam: 'yourOtherValue',
    }),
  });
}
