const passport = require('passport');
const Usuarios = require('../models/Usuarios')
const Sequelize = require('sequelize')
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const Op = Sequelize.Op
const enviarEmail = require('../handlers/email')
exports.autenticarUsuario = passport.authenticate('local' , {
    successRedirect : '/',
    failureRedirect : '/iniciar-sesion',
    failureFlash:true,
    badRequestMessage: 'Ambos Campos son obligatorios'
})

//Funcion para revistar loggeo

exports.usuarioAutenticado = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/iniciar-sesion')

}

exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion')
    });
}
//generar token si usuario es valido
exports.enviarToken = async(req, res) => {
    const {email} = req.body
    const usuario = await Usuarios.findOne({where: {email}})

    if(!usuario) {
        req.flash('error', 'No existe esa cuenta');
        res.redirect('/reestablecer')
    }
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    //guardarlos en la base de datos
    await usuario.save()

    //url de reset
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`

    //Enviar correo con el token

    // console.log(resetUrl)

    await enviarEmail.enviar({
        usuario,
        subject: 'Password Reset',
        resetUrl,
        archivo: 'reestablecer-password'
    })
    req.flash('correcto', 'Se envio un mensaje a tu correo')
    res.redirect('/iniciar-sesion')
}

exports.validarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    })

    if(!usuario) {
        req.flash('error', 'No valido')
        res.redirect('/reestablecer')
    }

    res.render('resetPassword', {
        nombrePagina: 'Reestablecer contraseña', 
    })
    console.log(usuario)
}

//verifica token valido y fecha de expiracion
exports.actualizarPassword = async(req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,
            expiracion : {
                [Op.gte] : Date.now()
            }
        }
    })

    if(!usuario){
        req.flash('error', 'No valido'),
        res.redirect('/reestablecer/')
    }

    //haashear el nuevo password para
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;

    //guardar nuevo password
    await usuario.save();
    req.flash('correcto', 'Tu password se ha modificado correctamente')
    res.redirect('/iniciar-sesion')
    


    console.log(req.params.token, usuario)
}