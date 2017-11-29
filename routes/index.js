var ObjectID = require('mongodb').ObjectID
var MongoClient = require('mongodb').MongoClient
var config = require('../config');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(config.mongoUrl, function( err, db ){
    db.collection('fulanos').find({}).toArray(function( err, data){
      res.render('index', { title: 'Usuarios cadastrados', data:data});      
        console.log('pegou os dados', data);
    })
  })
  
});
// ultima tent

router.get('/cadastro/edit/:id', function(req, res, next) {
  var id = ObjectID(req.params.id)

  MongoClient.connect(config.mongoUrl, function( err, db ){
    db.collection('fulanos').find({_id:id}).toArray(function( err, data){
      res.render('edit', {title:'edite seu cadastro', petecas:data});      
    })
  })

  // console.log('Pegou as info?', data)
  
});

// 

router.post('/cadastro/update', function(req, res, next) {
  
    var objeto = {nome:req.body.nome,idade:req.body.idade};
    var id = ObjectID(req.body.id)

    MongoClient.connect(config.mongoUrl, function( err, db ){
      db.collection('fulanos').update({_id:id},(objeto));
    })
    res.redirect('/');
  });

  router.get('/cadastro/delete/:id', function(req, res, next) {
    
      var objeto = {nome:req.body.nome,idade:req.body.idade};
      var id = ObjectID(req.params.id)
  
      MongoClient.connect(config.mongoUrl, function( err, db ){
        db.collection('fulanos').remove({_id:id});
      })
      res.redirect('/');
    });


// edit

router.get('/cadastro/edit', function(req, res, next) {
  res.render('edit', { title: 'Edite'});
  });


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
