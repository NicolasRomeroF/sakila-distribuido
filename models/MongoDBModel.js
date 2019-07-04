var mongoose = require("mongoose");
var elasticsearch = require('./ElasticSearchModel')
var Movie = require('./MovieModel')

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

function addMovie(data,res){
    console.log('guardando pelicula')
    var newMovie = new Movie()
    newMovie.title = data.title
    newMovie.content = data.content
    newMovie.save(function(err,movie){
        if(err){
        res.send('error al guardar pelicula');
        }else{
        console.log(movie)
        res.send(movie)
        }
    })
}

exports.addMovie = addMovie;

function getMovies(res){
    console.log('Obteniendo peliculas')
  Movie.find({})
  .exec(function(err,movies){
    if(err) {
      res.send('error al obtener peliculas')
    }else{
      console.log(movies)
      res.json(movies)
    }
  })
}

exports.getMovies = getMovies;

function getMovie(input,res){
    Movie.find({$or:[
        {'title':input},
        {'content':input}
    ]})
    .exec(function(err,movies){
        if(err){
            res.send('error al obtener pelicula')
        }else{
            console.log(movies)
            res.json(movies)
        }
    })
}

exports.getMovie = getMovie;