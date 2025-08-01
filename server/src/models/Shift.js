const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Shift = sequelize.define('shifts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
    },
    branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'branches',
            key: 'id'
        },
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.DATE,
    },
    sales: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cash_initial: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cash_expected: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cash_actual: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bank_transfer: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    qris: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    transaction: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    delivery: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    item: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    service: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    difference: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    paid: {
        type: DataTypes.INTEGER,
    },
    unpaid: {
        type: DataTypes.INTEGER,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    deletedAt: {
        type: DataTypes.DATE,
    },
    expense: {
        type: DataTypes.INTEGER,
    }
}, {
    paranoid: true,
    timestamps: true,
    tableName: 'shifts'
});

Shift.associate = (models) => {
    Shift.hasMany(models.Expense, { foreignKey: 'shift_id', onDelete: "CASCADE" });

    Shift.belongsTo(models.Branch, { foreignKey: 'branch_id', onDelete: "CASCADE" });
    Shift.belongsTo(models.User, { foreignKey: 'employee_id', as: 'employee_shift', onDelete: "CASCADE" });
}

module.exports = Shift;