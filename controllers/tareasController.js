const Tareas = require('../models/Tareas')
const Proyectos = require('../models/Proyectos')

exports.agregarTarea = async(req, res, next) =>{
    const proyecto = await Proyectos.findOne({
        where:{ url : req.params.id}
    })
    const {tarea} = req.body
    const estado = 0
    const proyectoId = proyecto.id

    const resultado = await Tareas.create({
        tarea, estado, proyectoId
    })
    if(!resultado) {
        return next()
    }

    res.redirect(`/proyectos/${req.params.id}`)
    // console.log(resultado)
    // res.send('enviado')
}

exports.cambiarEstadoTarea = async (req,res,next) => {
    const {id} = req.params
    const tarea = await Tareas.findOne({
        where: { id },
    })

    let estado = 0
    if(tarea.estado === estado){
        estado = 1
    }
    tarea.estado = estado
    const resultado = await tarea.save();

    if(!resultado) return next();
    res.status(200).send('Actualizado')

}

exports.eliminarTarea = async (req, res, next) => {
    const {id} = req.params;
    const restultado = await Tareas.destroy({where: { id }})

    if(!restultado) return next();
    res.status(200).send('La tarea se ha eliminado')
}