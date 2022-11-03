const User = require("../models/User")
const Pet = require('../models/Pet')

module.exports = class IndexController{

    static async  principal(req,res){
        
        res.render('home/index')
    }
   

}