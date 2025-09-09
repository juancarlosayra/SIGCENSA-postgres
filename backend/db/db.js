const { Sequelize } = require('sequelize');
require('dotenv').config()


export const sequelize = new Sequelize(process.env.PG_DB, process.env.PG_DB_USER, process.env.PG_DB_PASSWORD, {
  host: process.env.PG_DB_HOST,
  dialect: 'postgres'
});


