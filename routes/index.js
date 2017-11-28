var MongoClient = require('mongodb').MongoClient
var config = require('../config');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(config.mongoUrl, function( err, db ){
    db.collection('fulanos').find({}).toArray(function( err, data){
      res.render('index', { title: 'Cadastros:', data:data});      
        console.log('pegou os dados', data);
    })
  })

  // console.log('Pegou as info?', data)
  
});

router.get('/cadastro/edit/:id', function( req, res ) {
  res.write('opa ' + req.params.id );
  res.end();
})

// GET 
router.get('/cadastro', function(req, res, next) {
  res.render('cadastro', { title: 'Cadastro'});
  });

// POST 
router.post('/cadastro', function(req, res, next) {
  
  var objeto = {nome:req.body.nome,idade:req.body.idade};

  MongoClient.connect(config.mongoUrl, function( err, db ){
    db.collection('fulanos').insert(objeto);
  })
 
  res.redirect('/');

});

module.exports = router;
