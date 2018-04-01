const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const participantsDB = './resources/database/participants-db.json';
const routesDB = './resources/database/routes-db.json';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('resources'));


app.get('/', (req, res) => {
  res.send('OK');
});

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

function writeToDB(url,jsonToWrite,req,res){
  fs.writeFile(url, jsonToWrite, (err, data) => {
    if (!err) {
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
      participantList = (participantList.sort((a, b) => parseFloat(a.result) - parseFloat(b.result))).reverse();
      console.log(participantList);
      //Change new update array back to JSON:
      const jsonToWrite = JSON.stringify(participantList);
      fs.writeFile(url, jsonToWrite, (err, data) => {
        if (!err && isNew) {
          res.json({ success: true });
        } else {
          console.log('Cant write file or isNew === false', err);
          res.json({ success: false });
        }
      });
    } else {
      console.log('Cant read file', err);
      res.json({ success: false });
    }
  });
}

// GET method for ROUTES/WALLS to get them from database and send to front-end
app.get('/routes', (req, res) => {
  getRoutesFromDB(routesDB, req, res);
});

// GET method for PARTICIPANTS to get them from database and send to front-end
app.get('/participants', (req, res) => {
  getParticipantsFromDB(participantsDB,req,res);
});

// add New Result
app.post('/add_result', (req, res) => {
  addNewResult(participantsDB,req.body,req,res);
});

app.post('/new_participant', (req, res) => {
  const participant = {
    "fname": req.body.fname,
    "lname": req.body.lname,
    "finishedRoutes": "",
    "result": 0,
  }
  addNewParticipant(participantsDB,participant,req,res);
});

app.post('/delete_participant', (req, res) => {
  const _fname = req.body.fname,
    _lname = req.body.lname;
  let isRemoved = false;
  console.log(_fname, _lname);
  fs.readFile('./resources/database/participants-db.json', (err, data) => {
    // Read file
    if (!err) {
      //If OK, than read data from JSON to array:
      let participantList = JSON.parse(data);
      // Update participant's result:
      let i = 0;
      participantList.forEach(elem => {
        if (elem.fname == _fname && elem.lname == _lname) {
          participantList.splice(i, 1);
          isRemoved = true;
        }
        i++;
      });
      participantList = (participantList.sort((a, b) => parseFloat(a.result) - parseFloat(b.result))).reverse();
      console.log(participantList);
      //Change new update array back to JSON:
      const jsonToWrite = JSON.stringify(participantList);
      fs.writeFile('./resources/database/participants-db.json', jsonToWrite, (err, data) => {
        if (!err && isRemoved) {
          res.json({ success: true });
        } else {
          console.log('Cant write file or isRemoved === false', err);
          res.json({ success: false });
        }
      });
    } else {
      console.log('Cant read file', err);
      res.json({ success: false });
    }
  });
});




app.listen(3000, () => {
  console.log('Serwer uruchomiony na porcie http://localhost:3000');
});