const mongoose = require('mongoose')

// Schema d'un utilisateur dans la base de données
const userSchema = new mongoose.Schema({
    prenom: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mdp: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)