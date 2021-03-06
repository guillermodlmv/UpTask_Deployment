const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas')


exports.proyectosHome = async (req, res, next) => {
    // console.log(res.locals.usuario)
    const usuarioId = res.locals.usuario.id
    const proyectos = await Proyectos.findAll({where: { usuarioId }});
    res.render('index',  {
        nombrePagina: 'Proyectos',
        proyectos
    })
}

exports.formularioProyecto = async (req, res, next) => {
    const usuarioId = res.locals.usuario.id
    const proyectos = await Proyectos.findAll({where: { usuarioId }});
    res.render('nuevoProyecto',  {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}


exports.nuevoProyecto = async (req, res, next) => {
    //Enviar a consola lo que el usuario escriba
    // console.log(req.body)
    const usuarioId = res.locals.usuario.id
    const proyectos = await Proyectos.findAll({where: { usuarioId }});
    //validacion de input
    const { nombre } = req.body;

    let errores = [];

    if(!nombre){
        errores.push({'texto': 'Agrega un nombre al proyecto'})
    }

    //si hay errores para
    if(errores.length > 0){
        res.render('nuevoProyecto',  {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    }else{
        const usuarioId = res.locals.usuario.id
        await Proyectos.create({
            nombre,
            usuarioId
        })
        res.status(200).redirect('/')
    }
}

exports.proyectoPorUrl = async (req, res, next) => {
    const usuarioId = res.locals.usuario.id
    const proyectos = await Proyectos.findAll({where: { usuarioId }});
    const proyecto = await Proyectos.findOne({
        where: { 
            url: req.params.url
        }
    });

    const tareas = await Tareas.findAll({
        where:{
            proyectoId : proyecto.id
        },
        include:[{
            model:Proyectos
        }]
    });

    // console.log(proyecto, proyectos, proyecto)

    if(!proyecto) return next()
    res.render('tareas', {
        nombrePagina: 'Tareas del proyecto',
        proyectos,
        proyecto,
        tareas
    })
}

exports.fomularioEditar = async (req, res, next) => {
    //render a la vista
    console.log(req.params)
    const usuarioId = res.locals.usuario.id
    const proyectos = await Proyectos.findAll({where: { usuarioId }});
    const proyecto = await Proyectos.findOne({
        where: { 
            id: req.params.id,
            usuarioId
        }
    });
    console.log(proyecto, proyectos, proyecto)

    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async (req, res, next) => {
    //Enviar a consola lo que el usuario escriba
    // console.log(req.body)
    const usuarioId = res.locals.usuario.id
    const proyectos = await Proyectos.findAll({where: { usuarioId }});
    //validacion de input
    const { nombre } = req.body;

    let errores = [];

    if(!nombre){
        errores.push({'texto': 'Agrega un nombre al proyecto'})
    }

    //si hay errores para
    if(errores.length > 0){
        res.render('nuevoProyecto',  {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    }else{       
        let proyecto = await Proyectos.update(
            { nombre: nombre  },
            {where: {id: req.params.id}}
        )
        // console.log(proyecto.dataValues)
        res.status(200).redirect('/')
    }
}

exports.eliminarProyecto = async (req, res) => {
    const {urlProyecto} = req.query
    // console.log(urlProyecto)
    const resultado = await Proyectos.destroy({
        where: { url : urlProyecto }
    })

    if(!resultado){
        return next();
    }
    res.status(200).send('Proyecto Eliminado Correctamente')
}
