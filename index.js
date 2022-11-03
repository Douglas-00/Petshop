const express = require('express')
const {engine} = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')


//Chamando a aplicação
const app = express()

//Chamando a conexão bando de dados
const conn = require('./db/conn')


//Chamando os Models
const Task = require('./models/Task')
const Pet = require('./models/Pet')
const User = require('./models/User')

//Chamando as Rotas
const tasksRoutes =  require('./routes/tasksRoutes')
const indexRoute = require('./routes/indexRoute')
const authRoutes = require('./routes/authRoutes')

//import controller
const IndexController = require('./controllers/IndexController')


//Definindo Template Engine
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars')


app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(express.json())

//session midlaware
app.use(
    session({
        name:"session",
        secret:"nosso_secret",
        resave:false,
        saveUninitialized:false,
        store:new FileStore({
            logFn:function(){},
            path:require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie:{
            secure:false,
            maxAge:360000,
            expires:new Date(Date.now() + 360000),
            httpOnly:true
        }
    }),
)
//Flash Messages
app.use(flash())

//Public path
app.use(express.static('public'))

//set session to res
app.use((req,res,next)=>{
    if(req.session.userid){
        res.locals.session = req.session
    }
    next()
})
//Importando as Rotas 
app.use('/tasks', tasksRoutes)
app.use('/home', indexRoute)

app.use('/',authRoutes)


app.get('/', IndexController.principal)


//{force: true}force: true utlizado para acresentar algo na tabela.
conn.sync().then(()=>{
    app.listen(3000)
}).catch((err)=> console.log(err))