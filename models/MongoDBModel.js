var mongoose = require("mongoose");
var elasticsearch = require('./ElasticSearchModel')
var MovieSchema = mongoose.Schema({
    title: String,
    content: String
});
var Movie = mongoose.model('Movie', MovieSchema, 'movies');

function connectDB(){
    mongoose.connect("mongodb://localhost:27017/test");
    mongoose.connection.on("error", error => {    console.log("Database connection error:", error);});
    mongoose.connection.once("open", () => {
        console.log("Connected to Database!");
    });
}

exports.connectDB = connectDB;

function indexMovie(title,content){
    elasticsearch.addDocument(title,content);
}

function addMovie(data){
    var movie = new Movie(data);
    movie.save(function (err){
        if(err) return handleError(err);
    })
    indexMovie(data.title,data.content);
}

exports.addMovie = addMovie;