const mongoose = require('mongoose')

const memeSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    memeImage: {
        type: String,
        required: true,
    } 
})

module.exports = mongoose.model('Meme', memeSchema)