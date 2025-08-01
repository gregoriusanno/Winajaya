// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Business = sequelize.define('businesses', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     branch_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'branches',
//                 key: 'id'
//             }
//         },
//     type: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     pic_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     pic_phone: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     address: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     is_active: {
//         type: DataTypes.ENUM('active', 'inactive'),
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
//     tableName: 'businesses'
// });

// Business.associate = (models) => {
//     Business.hasMany(models.Collaboration, { foreignKey: 'business_id', onDelete: "CASCADE" });

//     Business.belongsTo(models.Branch, { foreignKey: 'branch_id', onDelete: "CASCADE" });
// }

// module.exports = Business;