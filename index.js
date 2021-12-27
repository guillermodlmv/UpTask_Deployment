const express = require("express");
const routes = require("./routes");
const path = require("path"); //Lee archivos existentes
const bodyParser = require("body-parser")
const flash = require("connect-flash")
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('./config/passport')
require('dotenv').config({path:'variables.env'})
//Helpers
const helpers = require("./helpers")


//Crear conexion a db
const db = require("./config/db")



//Importar el modelo
require("./models/Proyectos")
require("./models/Tareas")
require('./models/Usuarios');

db.sync({ force: false })  
    .then( () => console.log('Conectado al Servidor'))
    .catch( err => console.log(err))


//Crear app de express
const app = express();

//Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true}))




//Cargar archivos estaticos
app.use(express.static('public'));


// Habilitar Pug
app.set('view engine', 'pug')


//Agregar la carpeta de las vistas
app.set('views', path.join(__dirname, './views'))


//agregar flash messages
app.use(flash());

app.use(cookieParser());

// sessiones para navegar sin reautenticar

app.use(session({
    secret: 'supersecreta',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
//pasar var dump a la application
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
})

//Aprendiendo Middelware
app.use((req, res, next) => {
    next()
})

app.use((req, res, next) => {
    next()
})



app.use('/', routes())



//Puerto en que se conecta el servidor
//asignar servidor y puerto

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3002;

app.listen(port, host, () => {
    console.log('Server running')
});

// app.listen(3002);
