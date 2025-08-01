const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Discount = sequelize.define('discounts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('percent', 'nominal'),
        allowNull: false,
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
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
        type: DataTypes.DATE,
    },
}, {
    paranoid: true,
    timestamps: true,
    tableName: 'discounts'
});

Discount.associate = (models) => {
    Discount.hasMany(models.OrderDetail, { foreignKey: 'discount_id', onDelete: "CASCADE" });
    // Discount.hasMany(models.OrderProduct, { foreignKey: 'discount_id', onDelete: "CASCADE" });
    // Discount.hasMany(models.OrderProductDetail, { foreignKey: 'discount_id', onDelete: "CASCADE" });
}

module.exports = Discount;