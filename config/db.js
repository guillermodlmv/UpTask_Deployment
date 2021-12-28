const { Sequelize } = require('sequelize');
require('dotenv').config({path:'variables.env'})

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NOMBRE } = process.env;
const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NOMBRE}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

module.exports = db 