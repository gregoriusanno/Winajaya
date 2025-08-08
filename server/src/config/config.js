require("dotenv").config();

const logging_enable = process.env.DB_LOGGING.toLowerCase() === "true";
const db_port = parseInt(process.env.DB_PORT);

module.exports = {};
