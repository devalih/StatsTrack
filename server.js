const express = require('express');
const port = 3000;
const app = express();
// Import Admin SDK

// var admin = require("firebase-admin");

// //INIT OF FIREBASE DATABASE
// function InitFirebase() {
//   var config = {
//     apiKey: "AIzaSyAmg3qvDlorL-rCjMBbIKUO128xEdy1pCs",
//     authDomain: "statstrack-kolkol.firebaseapp.com",
//     databaseURL: "https://statstrack-kolkol.firebaseio.com",
//     projectId: "statstrack-kolkol",
//     storageBucket: "statstrack-kolkol.appspot.com",
//     messagingSenderId: "1039433851013"
//   };
//   firebase.initializeApp(config);

//   console.log("InitFirebase");
// } InitFirebase();

// // Get a database reference to our posts
// var db = admin.database();
// var ref = db.ref("server/saving-data/fireblog/posts");

// // Attach an asynchronous callback to read the data at our posts reference
// ref.on("value", function (snapshot) {
//   console.log(snapshot.val());
// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });

function readUserData() {
    let participantList = [];

    const participants = firebase.database().ref('participants');
    participants.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            participantList.push(childSnapshot.val());
        });
    });
    return participantList;
}

app.use(express.static('resources'));

app.get('/', function (req, res) {
  res.send('<h1>Hello World!</h1>');
  setTimeout(()=>{
    
  },3000); 
  console.log("hello",readUserData());
})

app.listen(port, function () {
  console.log("Server is running on http://localhost:" + port);
});