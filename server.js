const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const participantsDB = './resources/database/participants-db.json';
const routesDB = './resources/database/routes-db.json';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('resources'));

function getRoutesFromDB(url, req, res) {
  fs.readFile(url, (err, data) => {
    if (!err) {
      const routeList = JSON.parse(data);
      res.send(routeList);
    } else {
      console.log('File reading error', err);
      res.send('A read error has occurred.');
    }
  });
}

function getParticipantsFromDB(url, req, res) {
  fs.readFile(url, (err, data) => {
    if (!err) {
      const participantList = JSON.parse(data);
      res.send(participantList);
    } else {
      console.log('File reading error', err);
      res.send('A read error has occurred.');
    }
  });
}

function writeToDB(url, jsonToWrite, req, res, flag = true) {
  fs.writeFile(url, jsonToWrite, (err, data) => {
    if (!err && flag) {
      res.json({ success: true });
    } else {
      console.log('Cant write file', err);
      res.json({ success: false });
    }
  });
}

function addNewResult(url, participant, req, res) {
  const { fname, lname, route, points } = participant;
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
            elem.finishedRoutes.push(route);
          elem.result.push(parseInt(points));
        }
      });
      participantList = (participantList.sort((a, b) => a.result - b.result)).reverse();
      //Change new update array back to JSON:
      const jsonToWrite = JSON.stringify(participantList);
      writeToDB(url, jsonToWrite, req, res);
    } else {
      console.log('Cant read file', err);
      res.json({ success: false });
    }
  });
}

function deleteResult(url, participant, req, res) {
  const { fname, lname, route, points } = participant;
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
          let to_delete = [];
          for (let i in elem.finishedRoutes){
            if (elem.finishedRoutes[i] === route)
              to_delete.push(i);
          }
          for (let i of to_delete){
            elem.result.pop(i);
            elem.finishedRoutes.pop(i);
          }
        }
      });
      participantList = (participantList.sort((a, b) => a.result - b.result)).reverse();
      //Change new update array back to JSON:
      const jsonToWrite = JSON.stringify(participantList);
      writeToDB(url, jsonToWrite, req, res);
    } else {
      console.log('Cant read file', err);
      res.json({ success: false });
    }
  });
}

function modifyParticipant(url, participant, req, res) {
  const { fname, lname, finishedRoutes } = participant;
  console.log(fname, lname, finishedRoutes);
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
          elem.finishedRoutes = finishedRoutes;
        }
      });
      participantList = (participantList.sort((a, b) => a.result - b.result)).reverse();
      //Change new update array back to JSON:
      const jsonToWrite = JSON.stringify(participantList);
      writeToDB(url, jsonToWrite, req, res);
    } else {
      console.log('Cant read file', err);
      res.json({ success: false });
    }
  });
}

function addNewParticipant(url, participant, req, res) {
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
      writeToDB(url, jsonToWrite, req, res, isNew);
    } else {
      console.log('Cant read file', err);
      res.json({ success: false });
    }
  });
}

function deleteParticipant(url, participant, req, res) {
  const { fname, lname } = participant;
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
      writeToDB(url, jsonToWrite, req, res, isRemoved);
    } else {
      console.log('Cant read file', err);
      res.json({ success: false });
    }
  });

}

io.on('connection', socket => {
  socket.on('msg', data => {
    //Roześlij ją do wszystkich
    io.emit('newMsg', {
      nick: data.nick,
      msg: data.msg,
    });
  });
});

app.get('/', (req, res) => {
  res.send('OK');
});

// GET method for ROUTES/WALLS to get them from database and send to front-end
app.get('/routes', (req, res) => {
  getRoutesFromDB(routesDB, req, res);
});

// GET method for PARTICIPANTS to get them from database and send to front-end
app.get('/participants', (req, res) => {
  getParticipantsFromDB(participantsDB, req, res);
});

// add New Result, get data from front end and send 
// it to database
app.post('/participant/add_result', (req, res) => {
  addNewResult(participantsDB, req.body, req, res);
});

app.post('/participant/delete_result', (req, res) => {
  deleteResult(participantsDB, req.body, req, res);
});

app.post('/participant/new', (req, res) => {
  const participant = {
    "fname": req.body.fname,
    "lname": req.body.lname,
    "finishedRoutes": [],
    "result": [],
  }
  addNewParticipant(participantsDB, participant, req, res);
});

app.post('/participant/change', (req, res) => {
  const participant = {
    "fname": req.body.fname,
    "lname": req.body.lname,
    "finishedRoutes": req.body.finishedRoutes
  }
  modifyParticipant(participantsDB, participant, req, res);
});

app.post('/participant/delete', (req, res) => {
  deleteParticipant(participantsDB, req.body, req, res);
});

http.listen(3000, () => {
  console.log('Server running on port http://localhost:3000');
});