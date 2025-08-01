const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Absent = sequelize.define('absents', {
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
        }
    },
    branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'branches',
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    clock_in: {
        type: DataTypes.TIME,
        allowNull: false
    },
    clock_out: {
        type: DataTypes.TIME,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    work_duration: {
        type: DataTypes.TIME,
        allowNull: true
    },
    photo_clock_in: {
        type: DataTypes.STRING,
        allowNull: true
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
    tableName: 'absents'
});

Absent.associate = (models) => {
    Absent.belongsTo(models.Branch, { foreignKey: 'branch_id', onDelete: "CASCADE" });
    Absent.belongsTo(models.User, { foreignKey: 'employee_id', as: 'employee_absent', onDelete: "CASCADE" });
};

module.exports = Absent;