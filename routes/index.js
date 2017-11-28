// import { ObjectID } from '../../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bson';
var ObjectID = require('mongodb').ObjectID
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
  
    MongoClient.connect(config.mongoUrl, function( err, db ){
      db.collection('fulanos').updateOne(objeto);
    })
    res.redirect('/');
  });


// router.get('/cadastro/edit/:id', function(req, err, res){

//   console.log(req.params.id)
//   var id = ObjectID(req.params.id)

//   MongoClient.connect(config.mongoUrl, function(err,db){
//     db.collection('fulanos').find({_id:id}).toArray(function( err, data ){
//       res.render('edit');
//       console.log(data)            
//     })
//   })
// })

// edit

router.get('/cadastro/edit', function(req, res, next) {
  res.render('edit', { title: 'Edite'});
  });




// router.get('/cadastro/edit/:id', function( req, res ) {
//   var id = req.params.id;
//   res.write('opa ' id );
//   res.end();
// })

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
