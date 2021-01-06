const Meme = require('../models/meme')
const mongoose = require('mongoose')

exports.memes_get_all = (req, res, next) => {
    Meme.find().then((docs) => {
        res.status(200).json({
            wiadomosc: 'Lista wszystkich memów',
            info: docs,
        })
    }).catch((err) => res.status(500).json({error: err}))
}

exports.meme_add = (req, res, next) => {
    console.log(req.file);
    const meme = new Meme({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        tags: req.body.tags,
        memeImage: req.file.path
    })
    meme.save().then((doc) => {
        res.status(201).json({
            wiadomosc: 'Dodano nowego mema',
            info: doc
        })
    }).catch((err) => res.status(500).json({ error: err }))
}

exports.meme_get_one = (req, res, next) =>{
    const id = req.params.memeId
    Meme.findById(id).then((doc) => {
        res.status(200).json({
            wiadomosc: 'Szczegóły mema o id: ' + id,
            info: doc,
        })
    }).catch((err) => res.status(500).json({error: err}))
}

exports.meme_update = (req, res, next) => {
    const id = req.params.memeId
    Meme.findByIdAndUpdate(
        {title: req.body.title, tags: req.body.tags, memeImage: req.body.memeImage},
        {new: true}
    ).then((doc) => {
        res.status(200).json({
            wiadomosc: "Zmienieono meme o id: " + id,
            info: doc,
        })
    }).catch((err) => res.status(500).json({error: err}))
}

exports.meme_delete = (req, res, next) => {
    const id  = req.params.memeId
    Meme.findByIdAndDelete(id).then((doc) => {
        res.status(200).json({
            wiadomosc: 'Usinięto mema o id: ' + id,
            info: doc
        })
    }).catch((err) => res.status(500).json({error: err}))
}