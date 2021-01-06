const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const app = express()

mongoose.connect(
    process.env.DBconnection, {useNewUrlParser: true, useUnifiedTopology: true}
)

app.use(morgan('combined'))

app.use(bodyParser.json())

const memeRoutes = require('./api/routes/memes')
const userRoutes = require('./api/routes/users')

app.use('/memes', memeRoutes)

app.use('/users', userRoutes)

app.use((req, res, next) => {
    const error = new Error('Nie znaleziono')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        blad: {
            wiadomosc: error.message,
        },
    })
})

module.exports = app