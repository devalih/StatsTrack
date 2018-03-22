const express = require('express');
const port = 3000;
const app = express();

app.use(express.static('resources'));

app.get('/', function (req, res) {
  res.send('<h1>Hello World!</h1>');
//   setTimeout(()=>{
    
//   },3000); 
//   console.log("hello",readUserData());
})

app.listen(port, function () {
  console.log("Server is running on http://localhost:" + port);
});