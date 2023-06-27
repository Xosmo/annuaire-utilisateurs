const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')

// Route pour créer un nouvelle utilisateur
router.post('/register', userController.register)

// Route pour se login
router.post('/login', userController.login)

// Route pour avoir une liste des utilisateus
router.get('/', userController.getAllUsers)

// Route pour update son profil
router.post('/', userController.update)

module.exports = router