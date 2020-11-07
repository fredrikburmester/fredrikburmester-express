var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/:name', function(req, res, next) {
  res.render('index', { title: 'Home', 'album': req.params.name});
});

module.exports = router;
