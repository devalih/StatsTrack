const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('resources'));


// app.get('/shopping_list', (req, res) => {
//     fs.readFile(DB_FILE, (err, data) => {
//         if (!err){
//             const shoppingList = JSON.parse(data);
//             res.send('Lista zakupów: ' + shoppingList.join(', '));
//         } else {
//             console.log('Błąd odczytu pliku', err);
//             res.send('Wystąpił błąd odczytu.');
//         }
//     });
// });

// app.get('/add', (req, res) => {
//     fs.readFile(DB_FILE, (err, data) => {//Odczytaj plik
//         if (!err){
//             //Jeżeli jest ok, to wczytaj dane z JSONa do tablicy:
//             const shoppingList = JSON.parse(data);
//             //Dodaj nowy element:
//             shoppingList.push('Okulary przeciwsłoneczne');
//             //Zamień zaktualizowaną tablicę znów na JSON:
//             const jsonToWrite = JSON.stringify(shoppingList);

//             fs.writeFile(DB_FILE, jsonToWrite, (err, data) => {//Zapisz plik
//                 if (!err) {
//                     res.send('Dodano.');
//                 } else {
//                     console.log('Błąd zapisu pliku', err);
//                     res.send('Wystąpił błąd zapisu.');
//                 }
//             });
//         } else {
//             console.log('Błąd odczytu pliku', err);
//             res.send('Wystąpił błąd odczytu.');
//         }
//     });
// });
app.get('/', (req, res) => {
  res.send('OK');
});
// GET method for ROUTES/WALLS to get them from database and send to front-end
app.get('/routes', (req, res) => {
  fs.readFile('./resources/database/routes-db.json', (err, data) => {
    if (!err) {
      const routeList = JSON.parse(data);
      res.send(routeList);
    } else {
      console.log('Błąd odczytu pliku', err);
      res.send('Wystąpił błąd odczytu.');
    }
  });
});
// GET method for PARTICIPANTS to get them from database and send to front-end
app.get('/participants', (req, res) => {
  fs.readFile('./resources/database/participants-db.json', (err, data) => {
    if (!err) {
      const participantList = JSON.parse(data);
      res.send(participantList);
    } else {
      console.log('Błąd odczytu pliku', err);
      res.send('Wystąpił błąd odczytu.');
    }
  });
});

app.post('/add_result', (req, res) => {
  const _fname = req.body.fname,
    _lname = req.body.lname,
    _route = req.body.route,
    _points = req.body.points;

  fs.readFile('./resources/database/participants-db.json', (err, data) => {
    // Read file
    if (!err) {
      //If OK, than read data from JSON to array:
      let participantList = JSON.parse(data);
      // Update participant's result:
      participantList.forEach(elem => {
        if (elem.fname == _fname && elem.lname == _lname) {
          // add a coma separator after every result update,
          // no comma needed for the first result
          if (elem.finishedRoutes != "") 
            elem.finishedRoutes += ', ' + _route;
          else 
            elem.finishedRoutes += _route;

          elem.result = parseInt(elem.result) + parseInt(_points);
        }
      });
      participantList = (participantList.sort((a, b) => parseFloat(a.result) - parseFloat(b.result))).reverse();
      console.log(participantList);
      //Change new update array back to JSON:
      const jsonToWrite = JSON.stringify(participantList);

      fs.writeFile('./resources/database/participants-db.json', jsonToWrite, (err, data) => {
        if (!err) {
          res.json({success: true});
        } else {
          console.log('Cant write file', err);
          res.json({success: false});
        }
      });
    } else {
      console.log('Cant read file', err);
      res.json({success: false});
    }
  });
});

app.post('/new_participant', (req, res) => {
  const _fname = req.body.fname,
        _lname = req.body.lname,
        _route = "",
        _points = 0;
    const participant = {
      "fname" : _fname,
      "lname" : _lname,
      "finishedRoutes" : _route,
      "result" : _points,
    }

  fs.readFile('./resources/database/participants-db.json', (err, data) => {
    // Read file
    if (!err) {
      //If OK, than read data from JSON to array:
      let participantList = JSON.parse(data);
      // flag to check if the user exists or not
      let isNew = true;
      // Update participant's result:
      participantList.forEach(elem => {
        if (elem.fname == _fname && elem.lname == _lname){
          isNew = false;          
        }
      });
      if (isNew) 
        participantList.push(participant);
      participantList = (participantList.sort((a, b) => parseFloat(a.result) - parseFloat(b.result))).reverse();
      console.log(participantList);
      //Change new update array back to JSON:
      const jsonToWrite = JSON.stringify(participantList);
      fs.writeFile('./resources/database/participants-db.json', jsonToWrite, (err, data) => {
        if (!err && isNew) {
          res.json({success: true});
        } else {
          console.log('Cant write file or isNew === false', err);
          res.json({success: false});
        }
      });
    } else {
        console.log('Cant read file', err);
        res.json({success: false});
    }
  });
});

app.post('/delete_participant', (req, res) => {
  const _fname = req.body.fname,
        _lname = req.body.lname;
  let isRemoved = false;
  console.log(_fname,_lname);
  fs.readFile('./resources/database/participants-db.json', (err, data) => {
    // Read file
    if (!err) {
      //If OK, than read data from JSON to array:
      let participantList = JSON.parse(data);
      // Update participant's result:
      let i = 0;
      participantList.forEach(elem => {
        if (elem.fname == _fname && elem.lname == _lname){
          participantList.splice(i,1);
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
          res.json({success: true});
        } else {
          console.log('Cant write file or isRemoved === false', err);
          res.json({success: false});
        }
      });
    } else {
        console.log('Cant read file', err);
        res.json({success: false});
    }
  });
});




app.listen(3000, () => {
  console.log('Serwer uruchomiony na porcie http://localhost:3000');
});