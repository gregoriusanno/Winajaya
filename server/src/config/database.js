require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: 'dataKatsikat',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log
});

// Test koneksi
sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;