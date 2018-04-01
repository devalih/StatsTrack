const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const participantsDB = './resources/database/participants-db.json';
const routesDB = './resources/database/routes-db.json';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('resources'));

function getRoutesFromDB(url,req,res){
  fs.readFile(url, (err, data) => {
    if (!err) {
      const routeList = JSON.parse(data);
      res.send(routeList);
    } else {
      console.log('Błąd odczytu pliku', err);
      res.send('Wystąpił błąd odczytu.');
    }
  });
}

function getParticipantsFromDB(url,req,res){
  fs.readFile(url, (err, data) => {
    if (!err) {
      const participantList = JSON.parse(data);
      res.send(participantList);
    } else {
      console.log('Błąd odczytu pliku', err);
      res.send('Wystąpił błąd odczytu.');
    }
  });
}

function writeToDB(url,jsonToWrite,req,res,flag = true){
  fs.writeFile(url, jsonToWrite, (err, data) => {
    if (!err && flag) {
      res.json({ success: true });
    } else {
      console.log('Cant write file', err);
      res.json({ success: false });
    }
  });
}

function addNewResult(url,participant,req,res){
  const {fname, lname, route, points} = participant;
  console.log(fname, lname, route, points);
  fs.readFile(url, (err, data) => {
    // Read file
    if (!err) {
      //If OK, than read data from JSON to array:
      let participantList = JSON.parse(data);
      // Update participant's result:
      participantList.forEach(elem => {
        if (elem.fname == fname && elem.lname == lname) {
          // add a coma separator after every result update,
          // no comma needed for the first result
          if (elem.finishedRoutes != "")
            elem.finishedRoutes += ', ' + route;
          else
            elem.finishedRoutes += route;

          elem.result = parseInt(elem.result) + parseInt(points);
        }
      });
      participantList = (participantList.sort((a, b) => a.result - b.result)).reverse();
      //Change new update array back to JSON:
      const jsonToWrite = JSON.stringify(participantList);
      writeToDB(url,jsonToWrite,req,res);
    } else {
      console.log('Cant read file', err);
      res.json({ success: false });
    }
  });
}

function addNewParticipant(url,participant,req,res){
  fs.readFile(url, (err, data) => {
    // Read file
    if (!err) {
      //If OK, than read data from JSON to array:
      let participantList = JSON.parse(data);
      // flag to check if the user exists or not
      let isNew = true;
      // Update participant's result:
      participantList.forEach(elem => {
        if (elem.fname == participant.fname && elem.lname == participant.lname)
          isNew = false;
      });
      if (isNew)
        participantList.push(participant);
      participantList = (participantList.sort((a, b) => a.result - b.result)).reverse();
      //Change new update array back to JSON:
      const jsonToWrite = JSON.stringify(participantList);
      writeToDB(url,jsonToWrite,req,res,isNew);
    } else {
      console.log('Cant read file', err);
      res.json({ success: false });
    }
  });
}

function deleteParticipant (url,participant,req,res){
  const { fname, lname }= participant;
  let isRemoved = false;
  fs.readFile(url, (err, data) => {
    // Read file
    if (!err) {
      //If OK, than read data from JSON to array:
      let participantList = JSON.parse(data);
      // Update participant's result:
      let i = 0;
      participantList.forEach(elem => {
        if (elem.fname == fname && elem.lname == lname) {
          participantList.splice(i, 1);
          isRemoved = true;
        }
        i++;
      });
      participantList = (participantList.sort((a, b) => a.result - b.result)).reverse();
      //Change new update array back to JSON:
      const jsonToWrite = JSON.stringify(participantList);
      writeToDB(url,jsonToWrite,req,res,isRemoved);
    } else {
      console.log('Cant read file', err);
      res.json({ success: false });
    }
  });

}

app.get('/', (req, res) => {
  res.send('OK');
});

// GET method for ROUTES/WALLS to get them from database and send to front-end
app.get('/routes', (req, res) => {
  getRoutesFromDB(routesDB, req, res);
});

// GET method for PARTICIPANTS to get them from database and send to front-end
app.get('/participants', (req, res) => {
  getParticipantsFromDB(participantsDB,req,res);
});

// add New Result
app.post('/participant/add_result', (req, res) => {
  addNewResult(participantsDB,req.body,req,res);
});

app.post('/participant/new', (req, res) => {
  const participant = {
    "fname": req.body.fname,
    "lname": req.body.lname,
    "finishedRoutes": "",
    "result": 0,
  }
  addNewParticipant(participantsDB,participant,req,res);
});

app.post('/participant/delete', (req, res) => {
  deleteParticipant(participantsDB,req.body,req,res);
});

app.listen(3000, () => {
  console.log('Serwer uruchomiony na porcie http://localhost:3000');
});