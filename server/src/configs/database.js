require('dotenv').config();
const { Sequelize } = require('sequelize');

const logging_enable = process.env.DB_LOGGING.toLowerCase() === 'true';
const db_port = parseInt(process.env.DB_PORT);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: db_port,
  logging: logging_enable,
});

module.exports = sequelize;