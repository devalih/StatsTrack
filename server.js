const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
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
app.get('/', (req,res) => {
  
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

app.post('/add_participant', (req, res) => {
  const _fname = req.body.fname;
  const _lname = req.body.lname;
  const _route = req.body.route;
  const _points = req.body.points;
  // console.log(_fname,_lname,_route,_points);

  fs.readFile('./resources/database/participants-db.json', (err, data) => {
    // Read file
    if (!err) {
      //If or, than read data from JSON to array:
      const participantList = JSON.parse(data);
      //Add new participant:
      // participantList.push();
      // Update participant's result:
      participantList.forEach(elem => {
        if(elem.fname == _fname && elem.lname == _lname){
          elem.finishedRoutes +=', ' + _route;
          elem.result = parseInt(elem.result) + parseInt(_points); 
        }
      });
      console.log(participantList);
      //Change new update array back to JSON:
      const jsonToWrite = JSON.stringify(participantList);

      fs.writeFile('./resources/database/participants-db.json', jsonToWrite, (err, data) => {
        if (!err) {
          res.send('Dodano.');
        } else {
          console.log('Błąd zapisu pliku', err);
          res.send('Wystąpił błąd zapisu.');
        }
      });
    } else {
      console.log('Błąd odczytu pliku', err);
      res.send('Wystąpił błąd odczytu.');
    }
  });

});

app.listen(3000, () => {
  console.log('Serwer uruchomiony na porcie http://localhost:3000');
});