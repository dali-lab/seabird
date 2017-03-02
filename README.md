# Seabird Apps :ocean: :bird: :iphone:

Seabird Apps is a Dartmouth Start-Up founded by Dartmouth '17s. The purpose of this company is to create clean and efficient applications for schools, college and high schools alike, to allows any user become more accustomed to the school.

This specific application is for the Dartmouth App. This app is being built in React Native which deploys on both iOS and Android.

The following images are the most recent implementations and designs for the project:

![Implemented Design 1](https://github.com/dali-lab/seabird/blob/master/Seabird/Screenshots/home-screen.png "Home Screen")
![Implemented Design 2](https://github.com/dali-lab/seabird/blob/master/Seabird/Screenshots/news-screen.png "News Screen")
![Implemented Design 3](https://github.com/dali-lab/seabird/blob/master/Seabird/Screenshots/dds-screen.png "DDS Screen")

More designs for the application can be found [here](https://github.com/dali-lab/seabird/blob/master/Seabird/Screenshots)

## Architecture :boom:

- React Native is used for the front-end development of this project
  - A main aspect of this project is to deploy on both iOS and Android; React Native gives this project the ability to do so.
  - Make sure to `npm install` to ensure that all of your `node_modules` are all in place
- For the backend, Express, Mongoose, and MongoDB are all being used to store the user's information, keep track of module details and links, and also track the general content and designs for each page.
  - Originally the information was stored in a Google Spreadsheet, which was inefficient and non-scalable, so we decided to use well-documented options that would be easy to use as more information is being used in the application.
- Designers have been using Sketch primarily for this project
  - Sketch gives the designers the ability to share designs quickly and easily. They are able to export CSS attributes, making it easier for the developers when implementing the designs. Sketch also makes the task of presenting the latest mockups a lot seamless for a team.

## Setup :wrench:

1. Clone this repository `git clone https://github.com/dali-lab/seabird.git`

2. Go into the main directory and install all the necessary modules `cd seabird/Seabird && npm install`

3. Refer to the [seabird-backend](https://github.com/dali-lab/seabird-backend) repository for reference for the backend

## Style Guide

Using the [AirBnb](https://github.com/airbnb/javascript) style guide for Javascript for this project

## Authors :pencil:

* Will Kaufman '20 - Backend Engineer
* Ijemma Onwuzulike '19 - Front-end Engineer
* Sean Cann '17 - Front-end Engineer & Partner
* Tyler Fisher '17 - Front-end Engineer & Partner
* Shuoqi Chen '18 - Designer
* Emma Demers '20 - Designer

### Project Documents
1. [Project Proposal](https://docs.google.com/a/dali.dartmouth.edu/document/d/116sH23XuA61NVD2zhG5YXH1Cp6bWP_jM68CUCFll2Lc/edit?usp=sharing "Project Proposal")

2. [Feature Specs](https://docs.google.com/a/dali.dartmouth.edu/document/d/1pURueULJ0mw4Emk4YI_jxupdnmr6WMisqSNCqzBqHy8/edit?usp=sharing "Feature Spec")

3. [User Personas](https://docs.google.com/a/dali.dartmouth.edu/document/d/1m__HeHLbQqkQo75OVXKxPoYWWWLUpn3QlCppB-6jwKI/edit?usp=sharing "User Personas")

4. [User Flow](https://github.com/dali-lab/seabird/blob/master/Seabird/Documents/user flow.pdf "User Flow")

## Acknowledgments :mag:
[React Native Documentation](https://facebook.github.io/react-native/docs/getting-started.html)

[MongoDB Documentation](https://docs.mongodb.com/)
