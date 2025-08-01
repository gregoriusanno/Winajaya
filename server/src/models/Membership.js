// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Membership = sequelize.define('membership', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     customer_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'customers',
//             key: 'id'
//         },
//     },
//     payment_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'payments',
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
//     tableName: 'membership'
// });

// Membership.associate = (models) => {
//     Membership.belongsTo(models.Customer, { foreignKey: 'customer_id', onDelete: "CASCADE" });
//     Membership.belongsTo(models.Payment, { foreignKey: 'payment_id', onDelete: "CASCADE" });
// }

// module.exports = Membership;