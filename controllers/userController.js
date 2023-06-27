const User = require('../models/user')
const jwt = require('jsonwebtoken')

// Crée un utilisateur et l'neregistre dans la base de données
// post /user/register
const register = (req, res) => {
    const { prenom, nom, email, mdp } = req.body

    const newUser = new User({ prenom, nom, email, mdp })
    newUser.save()
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' })
        })
}

// Permet de se login
// post /user/login
const login = async (req, res) => {
    const { email, motDePasse } = req.body

    try {
        const user = await User.findOne({ email, motDePasse }).exec();

        if (!user) {
            return res.status(401).json({ error: 'Identifiants invalides' })
        }

        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' })

        res.json({ token })
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de l\'authentification' })
    }
}

// Renvoie une liste des utilisateurs
// Prenom et nom si l'on est pas connecté
// Prenom, nom et emai si l'on est connecté
// get /user
const getAllUsers = async (req, res) => {
    const { authorization } = req.headers;

    try {
        if (authorization && authorization.startsWith('Bearer ')) {
            const token = authorization.slice(7)
            const decoded = jwt.verify(token, 'secret')
            const users = await User.find({}, 'nom prenom email').exec()
            res.json(users);
        } else {
            const users = await User.find({}, 'nom prenom').exec()
            res.json(users)
        }
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' })
    }
}

// Permet de mettre à jour son profil
// post /user
const update = async (req, res) => {
    const { authorization } = req.headers
    const { prenom, nom, email } = req.body

    try {
        if (authorization && authorization.startsWith('Bearer ')) {
            const token = authorization.slice(7)
            const userId = req.user.userId

            const user = await User.findById(userId)

            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' })
            }

            user.prenom = prenom || user.prenom
            user.nom = nom || user.nom
            user.email = email || user.email

            const updatedUser = await user.save()

            res.json(updatedUser)
        } else {
            res.status(401).json({ error: 'Token manquant ou invalide' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' })
    }
}

module.exports = {
    getAllUsers,
    login,
    register,
    update
}
