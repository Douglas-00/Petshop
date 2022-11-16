const  {Sequelize} = require('sequelize')

//Criando Conexão com o banco de dados
const sequelize =  new Sequelize('petshop','root','1234',{
    host:'localhost',
    dialect:'mysql',
});

//Trtativa de ERRO 
try {
    sequelize.authenticate()
    console.log(`Conectamos ao Mysql`)
} catch (error) {
    console.log(`Não foi possivel conectar: ${error}`)
}

//Exportando o modulo
module.exports = sequelize