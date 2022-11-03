const {DataTypes} = require('sequelize')

const db = require('../db/conn')

//Fazendo a Ligação Pet ao Usuario
const User = require('./User')

const Pet = db.define('Pets',{
    nome:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true,
    },
    peso:{
        type:DataTypes.INTEGER,
        allowNull:false,
        require:true,
    },
    idade:{
        type:DataTypes.INTEGER,
        allowNull:false,
        require:true,
    },
    
})

//Regra de negocio
Pet.belongsTo(User)
User.hasMany(Pet)

//Exportando Model
module.exports = Pet