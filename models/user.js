const mongoose = require('mongoose')

// Schema d'un utilisateur dans la base de données
const userSchema = new mongoose.Schema({
    prenom: {
        type: String
    },
    nom: {
        type: String
    },
    email: {
        type: String
    },
    mdp: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)