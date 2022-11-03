const {DataTypes} = require('sequelize')

//chamando banco de dados
const db = require('../db/conn')

//Fazendo a Ligação Tarefa ao Usuario
const User = require('./User')

const Task = db.define('Task',{
    title:{
        type:DataTypes.STRING,
        required:true
    },
    description:{
        type:DataTypes.STRING,
        required:true
    },
    done:{
        type:DataTypes.BOOLEAN,
        required:true
    },
})

//Regra de negocio
Task.belongsTo(User)
User.hasMany(Task)

module.exports = Task