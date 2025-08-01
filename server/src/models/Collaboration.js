// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Collaboration = sequelize.define('collaborations', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     business_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'businesses', 
//             key: 'id'
//         },
//     },
//     start_date: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
//     end_date: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
//     createdAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//     },
//     updatedAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//     },
//     deletedAt: {
//         type: DataTypes.DATE,
//     },
// }, {
//     paranoid: true,
//     timestamps: true,
//     tableName: 'collaborations'
// });

// Collaboration.associate = (models) => {
//     Collaboration.hasMany(models.Order, { foreignKey: 'collaboration_id', onDelete: "CASCADE" });

//     Collaboration.belongsTo(models.Business, { foreignKey: 'business_id', onDelete: "CASCADE" });
// };

// module.exports = Collaboration;