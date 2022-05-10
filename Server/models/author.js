const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema ({
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

module.exports = mongoose.model('authors', AuthorSchema)