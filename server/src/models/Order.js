const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        refrences: {
            model: 'customers',
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
    payment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'payments',
            key: 'id'
        }
    },
    // collaboration_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true,
    //     references: {
    //         model: 'collaborations',
    //         key: 'id'
    //     }
    // },
    entry_date: {
        type: DataTypes.DATEONLY
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    order_type: {
        type: DataTypes.STRING
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
    tableName: 'orders'
});

Order.associate = (models) => {
    Order.belongsTo(models.Branch, { foreignKey: 'branch_id', onDelete: "CASCADE" });
    Order.belongsTo(models.Customer, { foreignKey: 'customer_id', onDelete: "CASCADE" });
    // Order.belongsTo(models.Collaboration, { foreignKey: 'collaboration_id', onDelete: "CASCADE" });
    Order.belongsTo(models.Payment, { foreignKey: 'payment_id', as: 'payment', onDelete: "CASCADE" });

    Order.hasMany(models.DeliveryDetail, { foreignKey: 'order_id', onDelete: "CASCADE" });
    Order.hasMany(models.OrderDetail, { foreignKey: 'order_id', as: 'order_details', onDelete: "CASCADE" });
}

module.exports = Order;