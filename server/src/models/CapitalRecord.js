// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const CapitalRecord = sequelize.define('capital_records', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'users',
//             key: 'id'
//         }
//     },
//     date: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     amount: {
//         type: DataTypes.DECIMAL(10, 2),
//         allowNull: false
//     },
//     type: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     description: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     photos: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     payment_method: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     createdAt: {
//         allowNull: false,
//         type: DataTypes.DATE,
//         defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
//     },
//     updatedAt: {
//         allowNull: false,
//         type: DataTypes.DATE,
//         defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
//     },
//     deletedAt: {
//         type: DataTypes.DATE
//     },

// }, {
//     paranoid: true,
//     timestamps: true,
//     tableName: 'capital_records'
// });

// CapitalRecord.associate = (models) => {
//     CapitalRecord.belongsTo(models.User, { foreignKey: 'user_id', onDelete: "CASCADE" });
// };

// module.exports = CapitalRecord;