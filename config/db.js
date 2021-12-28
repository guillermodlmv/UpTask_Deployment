const { Sequelize } = require('sequelize');
require('dotenv').config({path:'variables.env'})

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NOMBRE } = process.env;
const db = new Sequelize(`mysql://bc9ccf6f19cfda:36404e19@us-cdbr-east-05.cleardb.net/heroku_12ed9e9c1ac7f72`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

module.exports = db 