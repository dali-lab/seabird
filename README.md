# Seabird Apps :ocean: :bird: :iphone:

Seabird Apps is a Dartmouth Start-Up founded by Dartmouth '17s. The purpose of this company is to create clean and efficient applications for schools, college and high schools alike, to allows any user become more accustomed to the school.

This specific application is for the Dartmouth App. This app is being built in React Native which deploys on both iOS and Android.

The following images are the most recent implementations and designs for the project:

![Implemented Design 1](https://github.com/dali-lab/seabird/blob/master/Seabird/Screenshots/login.png "Login Screen")
![Implemented Design 2](https://github.com/dali-lab/seabird/blob/master/Seabird/Screenshots/user_type.png "User Type Screen")
![Implemented Design 3](https://github.com/dali-lab/seabird/blob/master/Seabird/Screenshots/home.png "Home Screen")
![Implemented Design 4](https://github.com/dali-lab/seabird/blob/master/Seabird/Screenshots/settings.png "News Screen")
![Implemented Design 5](https://github.com/dali-lab/seabird/blob/master/Seabird/Screenshots/customize.png "Dining Screen")
![Implemented Design 6](https://github.com/dali-lab/seabird/blob/master/Seabird/Screenshots/events.png "Events Screen")

More designs for the application can be found [here](https://drive.google.com/drive/u/0/folders/0B3gzFbdZqpokSnNncDBQYVJMODg)

## Architecture :boom:

- [React Native](https://facebook.github.io/react-native/docs/getting-started.html) is used for the front-end development of this project
  - A main aspect of this project is to deploy on both iOS and Android; React Native gives this project the ability to do so.
  - Make sure to `npm install` to ensure that all of your `node_modules` are all in place
- For the backend, [Firebase](https://firebase.google.com/docs/web/setup) and [Google App Scripts](https://developers.google.com/apps-script/) are being used to provide the app's information.
  - Originally the information was stored in a Google Spreadsheet, which was inefficient and non-scalable, so we decided to use well-documented options that would be easy to use as more information is being used in the application.
  - To address this issue, we decided to use Google Script to move all the data from Google sheets to Firebase so the app only had to use Firebase's API rather than Google Scripts' and Google Spreadsheets' APIs.
- This project doesn't make sure of CocoaPods, but it uses a number of node_modules installed from [npm](https://www.npmjs.com/)
  - [Sortable Grid](https://www.npmjs.com/package/react-native-sortable-grid)
  - [iOS Deploy](https://www.npmjs.com/package/ios-deploy)
  - [Hr](https://www.npmjs.com/package/react-native-hr)
- Followed the basic structure of a React Native project
  - Held most of the data (props) that would be used throughout the entire app in the `index.ios.js` file
  - Created folders that hold different types of views and components used throughout the app
  - `components` - Reusable components that could be placed in different locations. They were fairly generic and great for multiple uses
  - `screens` - Views that were fairly unique that needed to be defined as it's own distinct page
  - `Icons` - Contained all the images and icons used throughout the app
  - `Fonts` - This app uses custom fonts. So this folder holds all the fonts that were used
  - `Screenshots` - Images that were used to populate this README and for any other presentational purposes
  - `Documents` - Includes Word files
  - `firebase` - Includes the necessary firebase and analytics files
  - There were other folders that were either automatically generated when install a new npm project (`__tests__, node_modules, android, ios`)
- Designers have been using Figma for this project
  - Sketch is only offer to Mac Users. We decided to use Figma as an alternative so in the future the designers are able to understand a different environment that non-Mac users could use when designing.

## Setup :wrench:

1. Open terminal and go to the directory (folder) you want to copy the repo into.
  - `cd` is the Change Directory function in the terminal. To change to the next directory, type `cd ./dest_directory`

2.  Clone this repository `git clone https://github.com/dali-lab/seabird.git`

3. Go into the main directory and install all the necessary modules `cd seabird/Seabird && npm install`

## Deployment :rocket:

1. `react-native run-ios` to start the project

## Style Guide

We are using the [AirBnb](https://github.com/airbnb/javascript) style guide for this JSX project

## Authors :pencil:

### 17s

* Ricky Taboada '19 - Front-end Developer
* Ijemma Onwuzulike '19 - Front-end Developer
* Sean Cann '17 - Front-end Developer & Partner
* Tyler Fisher '17 - Front-end Developer & Partner
* Kathy Dong '17 - Designer
* Young Jang '19 - Designer
* Bella Jacoby '20 - Designer

### 17W

* Will Kaufman '20 - Backend Developer
* Ijemma Onwuzulike '19 - Front-end Developer
* Sean Cann '17 - Front-end Developer & Partner
* Tyler Fisher '17 - Front-end Developer & Partner
* Shuoqi Chen '18 - Designer
* Emma Demers '20 - Designer

### Project Documents
1. [Project Proposal](https://docs.google.com/a/dali.dartmouth.edu/document/d/116sH23XuA61NVD2zhG5YXH1Cp6bWP_jM68CUCFll2Lc/edit?usp=sharing "Project Proposal")

2. [Feature Specs](https://docs.google.com/a/dali.dartmouth.edu/document/d/1pURueULJ0mw4Emk4YI_jxupdnmr6WMisqSNCqzBqHy8/edit?usp=sharing "Feature Spec")

3. [User Personas](https://docs.google.com/a/dali.dartmouth.edu/document/d/1m__HeHLbQqkQo75OVXKxPoYWWWLUpn3QlCppB-6jwKI/edit?usp=sharing "User Personas")

4. [User Flow](https://drive.google.com/open?id=0BzOSaA4mjaaGbUpScXJvN0ZOdDg "User Flow")

5. [Current Designs](https://drive.google.com/open?id=0B3gzFbdZqpokSnNncDBQYVJMODg "Current Designs")

6. [Style Guide](https://drive.google.com/open?id=0BzOSaA4mjaaGRlBwZDJJTm9pR3c "Style Guide")

## Acknowledgments :mag:
Thanks to Tim, John, Kathy, and Armin for either guiding the project or providing helpful knowledge!
