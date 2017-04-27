import React, { Component } from 'react';

// Gets data from DB.
export function queryDB(child) {
  const output = new Promise(
    (resolve, reject) => {
      ddsLocations = [];
      fetch(`https://sbackend-25143.firebaseio.com/${child}.json`)
      .then(response => response.json())
      .then((responseJson) => {
        // console.log('responseJson');
        // console.log(responseJson);
        resolve(ddsLocations);
      })
      .catch((error) => {
        // console.log(error);
        reject(error);
      });
    },
  );
  return output;
}

// Writes data to the DB.
export function saveToDB(child) {
  fetch(`https://sbackend-25143.firebaseio.com/${child}.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: 'Mr.',
      lastName: 'Saxobeat',
    }),
  });
}
