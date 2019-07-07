var express = require('express');
var router = express.Router();
var mongo = require('../models/MongoDBModel');



router.post('/addMovie', function(req,res,next){
    console.log("agregando pelicula");
    mongo.addMovie(req.body,res);
})

router.get('/all', function(req,res,next){
    mongo.getMovies(res);
})

router.get('/search/:input', function (req,res,next){
    console.log("buscando ",req.params.input)
    mongo.getMovie(req.params.input,res);
})

module.exports = router;