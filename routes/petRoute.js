const express = require('express')

const router = express.Router()

const PetController = require('../controllers/PetController')

//Criando as Rotas

router.get('/pet', PetController.createPet)

module.exports = router