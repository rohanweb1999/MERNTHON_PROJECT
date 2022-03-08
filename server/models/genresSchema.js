

const mongoose = require('mongoose');

const genresSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});

const Genres = mongoose.model('Genres', genresSchema);


module.exports = Genres;
