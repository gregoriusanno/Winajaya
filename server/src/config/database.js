require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: process.env.DB_NAME || "winajaya",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  host: process.env.DB_HOST || "127.0.0.1",
  dialect: process.env.DB_DIALECT || "mysql",
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  logging:
    (process.env.DB_LOGGING || "").toLowerCase() === "true"
      ? console.log
      : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Test koneksi
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });

module.exports = sequelize;
