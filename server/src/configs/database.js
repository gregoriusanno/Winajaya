require("dotenv").config();
const { Sequelize } = require("sequelize");

const logging_enable = (process.env.DB_LOGGING || "").toLowerCase() === "true";
const db_port = parseInt(process.env.DB_PORT, 10) || 3306;

const sequelize = new Sequelize(
  process.env.DB_NAME || "winajaya",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "mysql",
    port: db_port,
    logging: logging_enable,
  }
);

module.exports = sequelize;
