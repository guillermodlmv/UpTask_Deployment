const Usuarios = require('../models/Usuarios')
const enviarEmail = require('../handlers/email')

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta en Uptask'
    })
}
exports.formIniciarSesion = (req, res) => {
    const {error} = res.locals.mensajes
    // console.log(res.locals.mensajes)
    res.render('IniciarSesion', {
        nombrePagina: 'Iniciar Sesion en Uptask',
        error
    })
}


exports.crearCuenta = async(req, res) => {
    const {email, password} = req.body
    //Leer datdos
    try{
        await Usuarios.create({email, password})
        // res.redirect('/iniciar-sesion')

        //Crear url de confirmacion
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`
        // crear el objeto de usuarios
        const usuario = {
            email
        }
        //Enviar email
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirmar cuenta',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        });
        //redirigir al usuario
        req.flash('correcto', 'Enviamos un correo, confirma tu cuenta');
        res.redirect('iniciar-sesion')
    }catch(error){
        
        let err = []
        // console.log(error)
        if(error.parent){
            parseInt(error.parent.code) === 23505 ? err.push('Usuario ya registrado') : 0
        }
        if(error.errors){
            err.push(error.errors[0].message)
        }
        req.flash('error', err.map(error => error))
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crear cuenta en Uptask',
            email,
            password
        })
    }
}

exports.formReestablecerPassword = (req, res) =>{
    res.render('restablecer',{
        nombrePagina: 'Restablecer tu Contraseña'
    })
}

//cambiar estado de una cuenta
exports.confirmarCuenta = async (req, res) =>{
    
    const usuario = await Usuarios.findOne({
        where:{
            email: req.params.correo
        }
    })
    console.log(usuario ? true: false)
    if(!usuario) {
        console.log(usuario)
        req.flash('error', 'No valido');
        res.redirect('/crear-cuenta')
    }
    usuario.activo = 1;
    await usuario.save();
    req.flash('correcto', 'cuenta activada correctamente')
    res.redirect('/iniciar-sesion/')

    // res.json(req.params.correo)

}
