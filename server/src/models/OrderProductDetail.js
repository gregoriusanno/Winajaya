// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const OrderProductDetail = sequelize.define('order_product_detail', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     order_product_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'order_product',
//             key: 'id'
//         },
//     },
//     product_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'product',
//             key: 'id'
//         },
//     },
//     discount_id: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: 'discounts',
//             key: 'id'
//         },
//     },
//     total_price_per_category: {
//         type: DataTypes.FLOAT,
//         allowNull: false,
//     },
//     quantity: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     date: {
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
//     tableName: 'order_product_detail'
// });

// OrderProductDetail.associate = (models) => {
//     OrderProductDetail.belongsTo(models.Discount, { foreignKey: 'discount_id', onDelete: "CASCADE" });
//     OrderProductDetail.belongsTo(models.OrderProduct, { foreignKey: 'order_product_id', onDelete: "CASCADE" });
//     OrderProductDetail.belongsTo(models.Product, { foreignKey: 'product_id', onDelete: "CASCADE" });
// }

// module.exports = OrderProductDetail;