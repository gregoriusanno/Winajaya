// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const OrderProduct = sequelize.define('order_product', {
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
//     branch_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'branches',
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
//     discount_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'discounts',
//             key: 'id'
//         },
//     },
//     date: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
//     total_price: {
//         type: DataTypes.FLOAT,
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
//     tableName: 'order_product'
// });

// OrderProduct.associate = (models) => {
//     OrderProduct.hasMany(models.OrderProductDetail, { foreignKey: 'order_product_id', as: 'order_product_details', onDelete: "CASCADE" });

//     OrderProduct.belongsTo(models.Branch, { foreignKey: 'branch_id', onDelete: "CASCADE" });
//     OrderProduct.belongsTo(models.Customer, { foreignKey: 'customer_id', onDelete: "CASCADE" });
//     OrderProduct.belongsTo(models.Discount, { foreignKey: 'discount_id', onDelete: "CASCADE" });
//     OrderProduct.belongsTo(models.Payment, { foreignKey: 'payment_id', onDelete: "CASCADE" });
// }

// module.exports = OrderProduct;