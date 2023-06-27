const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000

// Connexion à la base mongoDB
mongoose.connect(`mongodb://127.0.0.1:27017/annuaire`)
    .then(() => console.log('MongoDB OK !'))
    .catch(() => console.log('MongoDB ERROR !'))

//Routes
const userRoutes = require('./routes/userRoutes')

// URL encoded
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use routes
app.use('/user', userRoutes)

// Listen on port 3000
const server = app.listen(port, () => console.info(`Listenning on port ${port}`))