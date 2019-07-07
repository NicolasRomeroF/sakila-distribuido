var mongoose = require('mongoose')
var MovieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    film_id: Number,
    title: String,
    description: String
},{
    collection: 'film'
});

MovieSchema.index({title: "text", description: "text"}, {unique: false});

var Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;