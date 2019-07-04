var mongoose = require('mongoose')
var MovieSchema = mongoose.Schema({
    title: String,
    content: String
});
var Movie = mongoose.model('Movie', MovieSchema, 'movies');
module.exports = Movie;