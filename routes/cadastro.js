var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/cadastro', function(req, res) {
  res.render('cadastro');
});

router.get('/', function(req, res) {
  res.send('petecas');
  res.end();
});

module.exports = router;
