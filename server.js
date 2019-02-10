const express = require('express');
const app = express();
const index = require('./controllers/index');
const itemPage = require('./controllers/itemPage');

app.use( express.static( "public" ) ); // dossier public contient tout ce qui est externe

app.set('view engine', 'ejs');  // hedha bch ne5dmou 3l les view té3na 

app.get('/', function (req, res) { // index page
  index.execute(req, res);
});

app.get('/item/:id', function (req, res) { // item apge
  let id = req.params.id;
  itemPage.execute(id, req, res);
});

app.get('/item/:id/:season_ref', function (req, res) { // item apge
  let id = req.params.id;
  let season_ref = req.params.season_ref;
  itemPage.execute(id, season_ref, req, res);
});

app.get("*", function(req,res){ // page 404
  res.send("Error: No such page !");
});

app.listen(3000, function () {
  console.log('Server is listening on port 3000 !')
});