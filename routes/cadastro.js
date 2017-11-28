var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/cadastro', function(req, res) {
  res.render('cadastro');
});

module.exports = router;
