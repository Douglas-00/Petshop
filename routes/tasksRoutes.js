const express = require('express')

const router = express.Router()

const TaskController = require('../controllers/TaskController')

//Criando as Rotas

router.get('/add', TaskController.createTask)

//Rota tipo post
router.post('/add',TaskController.createTaskSave)
router.post('/remove',TaskController.removeTask)

router.get('/edit/:id',TaskController.updateTask)
router.post('/edit', TaskController.updateTaskPost)

//Atualizando Status da Tarefa
router.post('/updatestatus',TaskController.toggleTaskStatus)


router.get('/exibir', TaskController.showTasks)



//Exportando Modulo Rota
module.exports = router