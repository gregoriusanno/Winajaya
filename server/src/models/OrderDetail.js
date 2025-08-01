const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderDetail = sequelize.define('order_details', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'id'
        }
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    treatment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'treatment',
            key: 'id'
        }
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'items',
            key: 'id'
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    discount_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'discounts',
            key: 'id'
        }
    },
    process_time: {
        type: DataTypes.STRING,
    },
    process_time_cost: {
        type: DataTypes.DECIMAL(10, 2),
    },
    final_price: {
        type: DataTypes.DECIMAL(10, 2)
    },
    status: {
        type: DataTypes.STRING
    },
    due_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    description: {
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
    tableName: 'order_details'
});

OrderDetail.associate = (models) => {
    OrderDetail.belongsTo(models.Order, { 
        foreignKey: 'order_id', 
        as: 'order' 
    });
    OrderDetail.belongsTo(models.Treatment, { 
        foreignKey: 'treatment_id', 
        as: 'treatment' 
    });
    OrderDetail.belongsTo(models.Item, { 
        foreignKey: 'item_id', 
        as: 'item' 
    });
    OrderDetail.hasMany(models.ShoePhoto, { 
        foreignKey: 'order_detail_id', 
        as: 'shoes_photos' 
    });

    OrderDetail.belongsTo(models.Discount, { foreignKey: 'discount_id', onDelete: "CASCADE" });
    OrderDetail.belongsTo(models.User, { foreignKey: 'employee_id', as: 'employee', onDelete: "CASCADE" });
}

module.exports = OrderDetail;