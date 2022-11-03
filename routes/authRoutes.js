const express = require('express')

const router = express.Router()

const AuthController = require('../controllers/AuthController')

//Criando as Rotas

//Rota Conteudo Principal
router.get('/login', AuthController.login)
router.get('/register', AuthController.register)

//Rota post
router.post('/register', AuthController.registerPost)
router.get('/logout',AuthController.logout)
router.post('/login', AuthController.loginPost)

module.exports = router