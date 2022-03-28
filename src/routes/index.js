var express = require('express');
const sum = require('../util/sum');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  sum(3,1);
  res.render('index', { title: 'Express' });
});

module.exports = router;
