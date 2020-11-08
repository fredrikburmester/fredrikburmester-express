var express = require('express');
var router = express.Router();
var fetch = require("node-fetch");

var jsonObj;

fetch("https://fredrikburmester.com/static/json/photos.json")
  .then( (response) => response.json())
  .then((data)=> {jsonObj = data}) // output will be the required data
  .catch( (error) => console.log(error))

router.get('/', function(req, res, next) {
  res.redirect('/Home'); 
});

router.get('/:name(Home|Landscapes)?', function(req, res, next) {
  var images = [];
  jsonObj.forEach(image => {
    if(image['album'] == req.params.name) {
      images.push(image)
    }
  });
  res.render('index', { title: req.params.name, images: images});
});

module.exports = router;
