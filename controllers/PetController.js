const Pet = require('../models/Pet')

module.exports = class PetController{
    static createPet(req,res){
        res.render('pets/create')
    }
}