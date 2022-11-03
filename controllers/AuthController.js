const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController{
    /* Tratativa para o formulario de Login*/
    static login(req,res){
        res.render('auth/login')
    }

    static async loginPost(req,res){
        const {email, senha} =  req.body

        //Validar se o usuario existe
        const user = await User.findOne({where:{email:email}})

        if(!user){
            req.flash('message', 'Usuário Não Encontrado!!')
            res.render('auth/login')

            return
        }
        //checar a senha

        const senharecebida = bcrypt.compareSync(senha, user.senha)

        if(!senharecebida){
            req.flash('message', 'Senha Inválida!!')
            res.render('auth/login')

            return
        }
        req.session.userid = user.id


            req.flash('success', 'Bem Vindo!')
            //Salvando a sessão do usuario
            req.session.save(()=>{
                res.redirect('/')
            })
    }


    /* Tratativa para o formulario de cadastro*/
    static register(req,res){
        res.render('auth/cadastro')
    }
    static async registerPost(req,res){
        const {nome,email,telefone,senha,confirmpassword} = req.body

        //senha validação
        if(senha != confirmpassword){
            //Mensagem
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/cadastro')

            return
        }
        //verifica se o usuario existe no banco
        const checkUser = await User.findOne({where:{email:email}})

        if(checkUser){
            req.flash('message', 'O e-mail já está em uso!')
            res.render('auth/cadastro')

            return
        }

        //criar uma senha
        //criptografando a senha
        const salt = bcrypt.genSaltSync(10)
        const hashSenha = bcrypt.hashSync(senha, salt)

        const user = {
            nome,
            email,
            telefone,
            senha:hashSenha
        }
        //console.log(user)
        try{
            const createdUser = await User.create(user)
            //Assim que cadastrar, já iniciar a a sessão do usuario
            req.session.userid = createdUser.id


            req.flash('success', 'Cadastro realizado com sucesso!')
            //Salvando a sessão do usuario
            req.session.save(()=>{
                res.redirect('/')
            })
            
        }catch(err){
            console.log(err)
        }
        



    }
    static logout(req,res){
        req.session.destroy()

        res.redirect('/')
    }
}