var express = require('express');
var router = express.Router();
var fetch = require("node-fetch");

var images;
var albums;
var links = [];

fetch("https://fredrikburmester.com/static/json/photos.json")
.then( (response) => response.json())
.then((data)=> {images = data}) // output will be the required data
.catch( (error) => console.log(error))

fetch("https://fredrikburmester.com/static/json/albums.json")
.then( (response) => response.json())
.then((data)=> {
  albums = data
  albums.forEach(album => {
    links.push(album['menu-link'])
  });
}) // output will be the required data
.catch( (error) => console.log(error))

router.get('/', function(req, res, next) {
  res.redirect('/Home'); 
});

router.get('/:name(Home|Landscapes)?', function(req, res, next) {
  var albumImages = [];
  var title = req.params.name;
  var link = title;
  var currentAlbum; 

  // Get album specifics
  albums.forEach(album => {
    if(album['link'] == link) {
      currentAlbum = album;
    } 
  });
  
  // Get all images for specific album
  images.forEach(image => {
    if(image['album'] == link) {
      albumImages.push(image)
    }
  });

  res.render('index', { 
    link: currentAlbum.link, 
    title: currentAlbum.title, 
    description: currentAlbum.description, 
    images: albumImages,
    links: links
  });
});

module.exports = router;
