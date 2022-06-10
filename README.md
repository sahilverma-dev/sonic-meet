# Sonic Meet

This project can be described as "a video meeting experience with one goal: make joining meetings effortless". We connect people through frictionless video, voice, chat, and content sharing and enable face-to-face video experiences for thousands of people in a single meeting across disparate devices and locations.

![Sonic Meet](/screenshot/sonic-meet.png)

## Live Website

https://sonic-meet.netlify.app/

## Home Page

![Home](/screenshot/home.png)

## Room Page

![Explore](/screenshot/room.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/theviralboy/sonic-meet
```

Go to the project directory

```bash
  cd sonic-meet
```

Install dependencies on client and backend

```bash
  cd client
  npm install
```

```bash
  cd backend
  npm install
```

Adding Firebase

- Go to [Firebase console](https://console.firebase.google.com/).
- Crete a new project in Firebase.
- Enable Firesbase Authentication and FireStore.
- Go to the setting of the project and copy your credentials.
- Change [Firebase config](/client/src/firebase/config.js) and use your own.

[firebase/config.js](/client/src/firebase/config.js)

```js
const firebaseConfig = {
  apiKey: "xxxxxxx-xxxxxxxxx-xxxxxxxxxx-xxxxxxxxxxxx",
  authDomain: "xxxxxxx-xxxxxxxxx-xxxxxx",
  databaseURL: "xxxxxxx-xxxxxxxxx-xxxxxx",
  projectId: "xxxxxxx-xxxxxxxxx-xxxxxx",
  storageBucket: "xxxxxxx-xxxxxxxxx-xxxxxx",
  messagingSenderId: "xxxxxxx-xxxxxxxxx-xxxxxx",
  appId: "xxxxxxx-xxxxxxxxx-xxxxxx",
};
```

Start the client server

```bash
  npm run start # on client folder and it will run on localhost:3000
```

Start the backend server

```bash
  npm run start # on backend folder and it will run a server on localhost:5000
  npm run dev # on backend folder and it will run a development server on localhost:5000
```

And you are ready to go!

## Tech Stack

React, Firebase 9, TailwindCSS 3, simple-peer, Node JS, Socket IO

## Feedback

If you have any feedback, please reach out to us at sahilverma.webdev@gmail.com
