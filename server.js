const express = require('express');
const app = express();

var u = require('./models/db');

app.use( express.static( "public" ) ); // dossier public contient tout ce qui est externe

app.set('view engine', 'ejs');  // hedha bch ne5dmou 3l les view té3na 

app.get('/', function (req, res) { // page index
  var title = "WATCHD.tn | Home Page";
  res.render('index', {title: title});
});

app.get("*", function(req,res){ // page 404
  res.send("Error: No such page!");
});

app.listen(3000, function () {
  console.log('Server is listening on port 3000!')
});
