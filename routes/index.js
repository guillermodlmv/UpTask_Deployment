const express = require('express')
const { body } = require('express-validator');
const router = express.Router()
const proyectosController = require('../controllers/proyectosController')
const tareasController = require('../controllers/tareasController')
const usuariosContoller = require('../controllers/usuariosContoller')
const authContoller = require('../controllers/authController')
module.exports = function () {

    router.get('/', 
        authContoller.usuarioAutenticado,
        proyectosController.proyectosHome
    );
        
    router.get('/nuevo-proyecto', 
        authContoller.usuarioAutenticado,
        proyectosController.formularioProyecto
    );
    
    router.post('/nuevo-proyecto/',
        authContoller.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );

    router.get('/proyectos/:url', 
        authContoller.usuarioAutenticado,
        proyectosController.proyectoPorUrl
    );

    router.get('/proyecto/editar/:id', 
        authContoller.usuarioAutenticado,
        proyectosController.fomularioEditar
    );

    router.post('/nuevo-proyecto/:id',
        authContoller.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    );

    router.delete('/proyectos/:url', 
        authContoller.usuarioAutenticado,
        proyectosController.eliminarProyecto
    );

    //tareas
    router.post('/proyectos/:id', 
        authContoller.usuarioAutenticado,
        tareasController.agregarTarea
    );

    router.patch('/tareas/:id', 
        authContoller.usuarioAutenticado,
        tareasController.cambiarEstadoTarea
    );

    router.delete('/tareas/:id', 
        authContoller.usuarioAutenticado,
        tareasController.eliminarTarea
    );

    router.get('/crear-cuenta/',usuariosContoller.formCrearCuenta);
    router.post('/crear-cuenta/',usuariosContoller.crearCuenta);
    router.get('/confirmar/:correo', usuariosContoller.confirmarCuenta)

    router.get('/iniciar-sesion/',usuariosContoller.formIniciarSesion);
    router.post('/iniciar-sesion/', authContoller.autenticarUsuario);

    router.get('/cerrar-sesion/', authContoller.cerrarSesion);

    router.get('/reestablecer', usuariosContoller.formRestablecerPassword);
    router.post('/reestablecer', authContoller.enviarToken);
    router.get('/reestablecer/:token', authContoller.validarToken);
    router.post('/reestablecer/:token', authContoller.actualizarPassword);

    return router;

}
