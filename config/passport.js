const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const Usuarios = require('../models/Usuarios')

//local Strategy

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try{
                const usuario = await Usuarios.findOne({
                    where: { 
                        email,
                        activo:1
                    }
                });

                if(!usuario.verificarPassword(password)){
                    return done(null, null, {
                        message: 'Password Incorrecto'
                    })
                }
                    return done(null, usuario)
                

            }catch(error){
                return done(null, false, {
                    message: 'Esta cuenta no existe'
                })
            }
        }
    )
);

//serializar el usuario para
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
})

//deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
})

module.exports = passport