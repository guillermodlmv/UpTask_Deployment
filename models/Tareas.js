const Sequelize = require('sequelize')
const db = require('../config/db')
const Proyectos = require('./Proyectos')
const Tareas = db.define('tareas', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true,
    },
    tarea : {
        type: Sequelize.STRING(100),
    },
    estado : {
        type: Sequelize.INTEGER,
    },
})

Tareas.belongsTo(Proyectos)

module.exports = Tareas;