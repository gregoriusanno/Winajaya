const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('customers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gender: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    gmaps: {
        type: DataTypes.STRING
    },
    date_birthday: {
        type: DataTypes.DATEONLY
    },
    city: {
        type: DataTypes.STRING
    },
    hobby: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    working_type: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    deletedAt: {
        type: DataTypes.DATE
    },
}, {
    paranoid: true,
    timestamps: true,
    tableName: 'customers'
});

Customer.associate = (models) => {
    Customer.hasMany(models.Order, { foreignKey: 'customer_id', as: 'orders', onDelete: "CASCADE" });
    // Customer.hasMany(models.Membership, { foreignKey: 'customer_id', onDelete: "CASCADE" });
    // Customer.hasMany(models.OrderProduct, { foreignKey: 'customer_id', onDelete: "CASCADE" });
};

module.exports = Customer;