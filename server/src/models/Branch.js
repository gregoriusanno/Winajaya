const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Branch = sequelize.define('branches', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    manager_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: 'branches'
});

Branch.associate = (models) => {
    Branch.hasMany(models.Absent, { foreignKey: 'branch_id', onDelete: "CASCADE" });
    Branch.hasMany(models.Ai, { foreignKey: 'branch_id', onDelete: "CASCADE" });
    // Branch.hasMany(models.Business, { foreignKey: 'branch_id', onDelete: "CASCADE" });
    Branch.hasMany(models.Order, { foreignKey: 'branch_id', onDelete: "CASCADE" });
    // Branch.hasMany(models.OrderProduct, { foreignKey: 'branch_id', onDelete: "CASCADE" });
    Branch.hasMany(models.Shift, { foreignKey: 'branch_id', onDelete: "CASCADE" });
    Branch.hasMany(models.User, { foreignKey: 'branch_id', onDelete: "CASCADE" });
};

module.exports = Branch;