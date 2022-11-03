const express = require('express')

const router = express.Router()

const IndexController = require('../controllers/IndexController')

//Criando as Rotas

//Rota Conteudo Principal
router.get('/', IndexController.principal)


module.exports = router