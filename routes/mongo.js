var express = require('express');
var router = express.Router();
var mongo = require('../models/MongoDBModel');


router.get('/connect', function(req, res, next){
    mongo.connectDB();
    return "Ok";
})

router.post('/addMovie', function(req,res,next){
    console.log("################################")
    mongo.addMovie(req.body);
})

module.exports = router;