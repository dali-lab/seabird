import React, { Component } from 'react';
import { NavBar } from './components/navBar';


// returns all the dining hours
export function getDiningHours(codes) {
  const output = new Promise(
    function(resolve, reject) {
      ddsLocations = [];
      fetch('http://localhost:3000/api/schools/' + codes.schoolID + '/' + codes.view + '/' + codes.viewID)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('responseJson');
        console.log(responseJson);
        ddsLocations.push(responseJson.times[0].startTime + ' - ' + responseJson.times[0].endTime);
        ddsLocations.push(responseJson.name);
        resolve(ddsLocations);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    }
  );
  return output;
}
