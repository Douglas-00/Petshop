//Chamando o Model
const Task = require('../models/Task')

module.exports = class TaskController{
    static createTask(req,res){
        res.render('tasks/create')
    }
    
    //Salvando a Tarefa no Banco de Dados
    static async createTaskSave(req,res){
        const task = {
            title:req.body.title,
            description:req.body.description,
            done:false
        }
        //Validações
        //Processar Dados

        await Task.create(task)

        res.redirect('/tasks/exibir')
    }

    static async removeTask(req,res){
        const id = req.body.id

        //Excluindo dado do id
        await Task.destroy({where:{id:id}})

        res.redirect('/tasks/exibir')
    }

    static async updateTask(req,res){
        const id = req.params.id
        //Buscando objetos do id para atualizar
        const task = await Task.findOne({where:{id:id}, raw: true})

        res.render('tasks/edit', { task })
    }

    static async updateTaskPost(req,res){
        const id = req.body.id
        //Atualizando o objeto 
        const task = {
            title:req.body.title,
            description:req.body.description,
        }

        await Task.update(task, {where:{id:id}})
        //Direcionando para a página de tarefas
        res.redirect('/tasks/exibir')

    }

    //Função para alterar o status tarefa

    static async toggleTaskStatus(req,res){
        const id = req.body.id

        const task ={
        done:req.body.done ==='0' ? true : false
        }

        await Task.update(task, {where:{id:id}})

        res.redirect('/tasks/exibir')
    }
    
    
    static async showTasks(req,res){
        const tasks = await Task.findAll({raw: true})
        //console.log(tasks)
        res.render('tasks/all',{ tasks })
    }
    
}
