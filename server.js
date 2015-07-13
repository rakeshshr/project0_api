// SERVER-SIDE JAVASCRIPT

// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require('underscore');

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// configure bodyParser (for handling data)
app.use(bodyParser.urlencoded({extended: true}));

// pre-seeded food data
var foods = [
  {id: 1, name: 'Lasanga', origin: 'Italy', desc: 'Layers of cheese, sauce and pasta sheets'},
  {id: 2, name: 'Taco', origin: 'Mexico', desc: 'yummy in my tummy'}
];

// STATIC ROUTES

// root (serves index.html)
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// API ROUTES

// foods index
app.get('/api/foods', function (req, res) {
  // send all foods as JSON response
  res.json(foods);
});

// create new food
app.post('/api/foods', function (req, res) {
  // grab params (name, origin, desc) from form data
  var newFood = req.body;
  
  // set sequential id (last id in foods array + 1)
  if (foods.length > 0) {
    newFood.id = foods[foods.length - 1].id +  1;
  } else {
    newFood.id = 0;
  }

  // add newFood to `foods` array
  foods.push(newFood);
  
  // send newFood as JSON response
  res.json(newFood);
});

// update food
app.put('/api/foods/:id', function (req, res) {

  // set the value of the id
  var targetId = parseInt(req.params.id);

  // find item in foods array matching the id
  var foundFood = _.findWhere(foods, {id: targetId});

  // update the foods name
  foundFood.name = req.body.name;

  // update the food's origin
  foundFood.origin = req.body.origin;

   // update the foods description
  foundFood.desc = req.body.desc;

  // send back edited object
  res.json(foundFood);
});

// delete food
app.delete('/api/foods/:id', function (req, res) {
  
  // set the value of the id
  var targetId = parseInt(req.params.id);

  // find item in foods array matching the id
  var foundFood = _.findWhere(foods, {id: targetId});

  // get the index of the found item
  var index = foods.indexOf(foundFood);
  
  // remove the item at that index, only remove 1 item
  foods.splice(index, 1);
  
  // send back deleted object
  res.json(foundFood);
});

// set server to localhost:3004
app.listen(3000, function () {
  console.log('server started on localhost:3002');
});





