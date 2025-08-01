const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('payments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    method: {
        type: DataTypes.STRING
    },
    total_process_time_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    total_discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    final_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY
    },
    money: {
        type: DataTypes.DECIMAL(10, 2)
    },
    change: {
        type: DataTypes.DECIMAL(10, 2)
    },
    evidence_photo: {
        type: DataTypes.STRING
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
    tableName: 'payments'
});

Payment.associate = (models) => {
    Payment.hasMany(models.Order, { foreignKey: 'payment_id', as: 'order', onDelete: "CASCADE" });
    // Payment.hasMany(models.Membership, { foreignKey: 'payment_id', onDelete: "CASCADE" });
    // Payment.hasMany(models.OrderProduct, { foreignKey: 'payment_id', onDelete: "CASCADE" });
}

module.exports = Payment;