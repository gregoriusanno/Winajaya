import { Sequelize } from 'sequelize';
import db from '../configs/database.js';

const { DataTypes } = Sequelize;

const Karyawan = db.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.STRING,
},{
    freezeTableName: true
});

export default Karyawan;