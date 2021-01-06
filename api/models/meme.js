const mongoose = require('mongoose')

const memeSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    tags:{
        type: String,
        required: false,
    },
    memeImage:{
        type: String,
        required: true,
    } 
})

module.exports = mongoose.model('Memes', memeSchema)