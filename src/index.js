const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const { engine } = require('express-handlebars');

//Initializations 
const app = express()
//settings
app.set('port', process.env.PORT  || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.set("views", "./views");


//Middlewares
app.use(express.urlencoded({extended: false}));//
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave:true,
    saveUninitialized: true
}))

//Global Variables

//Routes
app.use(require('./routes/index'))
app.use(require('./routes/notes'))
app.use(require('./routes/users'))
//Static Files
app.use(express.static(path.join(__dirname, 'public')))
//Server is listening

app.listen(app.get('port'),() => {
    console.log('server on port', app.get('port'))
});