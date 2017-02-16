# Seabird Apps

Seabird Apps is a Dartmouth Start-Up founded by Dartmouth '17s. The purpose of this company is to create clean and efficient applications for schools, college and high schools alike, to allows any user become more accustomed to the school.

This specific application is for the Dartmouth App. This app is being built in React Native which deploys on both iOS and Android.

The following images are the most recent implementations and designs for the project:

![Implemented Design 1](https://github.com/dali-lab/seabird/blob/master/Seabird/Screenshots/home-screen.png "Home Screen")

![Implemented Design 2](https://github.com/dali-lab/seabird/blob/master/Seabird/Screenshots/news-screen.png "News Screen")

![Implemented Design 3](https://github.com/dali-lab/seabird/blob/master/Seabird/Screenshots/dds-screen.png "DDS Screen")


## Architecture

- React Native is used for the frontend development of this project
  - A main aspect of this project is to deploy on both iOS and Android; React Native gives this project the ability to do so.
- For the backend, Express, Mongoose, and MongoDB are all being used to store the user's information, keep track of module details and links, and also track the general content and designs for each page.
  - Originally the information was stored in a Google Spreadsheet, which was inefficient and non-scalable, so we decided to use well-documented options that would be easy to use as more information is being used in the application.
- Designers have been using Sketch primarily for this project
  - Sketch gives the designers the ability to share designs quickly and easily. They are able to export CSS attributes, making it easier for the developers when implementing the designs. Sketch also makes the task of presenting the latest mockups a lot seamless for a team.

## Setup

To set up the environment, enter your terminal and follow the instructions:

1. Install Homebrew:
```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)"
brew update
```

2. Install Node (Mac):
```
brew install node
```

3. [Mongodb](https://docs.mongodb.com/manual/installation/#mongodb-community-edition)

  ```
  brew install mongodb
  sudo mkdir -p /data/db
  sudo chmod 777 /data/db # allow write access
  ```

4. Clone this repo
5. Clone the [Seabird Repo](https://github.com/dali-lab/seabird-backend)
  - Make sure to clone in the same general directory

### Installation
```
# clone repository and install node modules
cd seabird-backend
npm install
```

For in-depth references and information, please refer to the Facebook website.

[React Native Setup](https://facebook.github.io/react-native/docs/getting-started.html)

[Node for Windows](https://nodejs.org/en/download/)


## Deployment
Pull from this repo and open up the Xcode project and deploy the project on an emulator or on your own phone. If you want to run this application on your Android device, connect your phone to your computer and run the following code in main directory on your command-line:

### Starting the Server
n a separate shell, run `mongod &` to start mongodb server.

```
# start backend in dev mode
npm run dev
```

## API Documentation

All endpoints are at the `/api/*` path. URLs expressed below are just the paths, not the entire root URL.

### Get view by school and view ID

- **URL** `/schools/:school_id/views/:view_id`
- **Method:** `GET`

-  **URL Params**

   **Required:**

   `school_id`: alphanumeric id of school

   `view_id`: alphanumeric id of view

- **Data Params**

    none

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{
      name: String,
      school_id: Schema.Types.ObjectId,
      type: String,
      text: String,
      url: String,
      rendered: Boolean,
      hours_id: Schema.Types.ObjectId,
    }`

- **Sample Call:**

  ```javascript
  request.get('/api/schools/58a0b218c312dd67becff87d/views/58a0b219c312dd67becff87f', (err, res, body) => {
    console.log(body);
  })
  ```

  Would get something like

  ```javascript
  {
    "_id":"58a0b219c312dd67becff87f",
    "url":"https://m.dartmouth.edu/map/",
    "school_id":"58a0b218c312dd67becff87d",
    "name":"Map",
    "__v":0
  }
  ```

## Authors

* Will Kaufman '20 - BackEnd Engineer
* Ijemma Onwuzulike '19 - FrontEnd Engineer
* Sean Cann '17 - FrontEnd Engineer
* Tyler Fisher '17 - FrontEnd Engineer
* Shuoqi Chen '18 - Designer
* Emma Demers '20 - Designer

## Acknowledgments
[React Native Documentation](https://facebook.github.io/react-native/docs/getting-started.html)
[MongoDB Documentation](https://docs.mongodb.com/)
