const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DeliveryDetail = sequelize.define('delivery_details', {
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
      key: 'id',
    }
  },
  delivery_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'deliveries',
      key: 'id',
    }
  },  
  address: {
    type: DataTypes.STRING
  },
  date: {
    type: DataTypes.DATEONLY
  },
  type: {
    type: DataTypes.STRING
  },
  photo_url: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  distance: {
    type: DataTypes.DECIMAL(10, 2)
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2)
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
  tableName: 'delivery_details'
});

DeliveryDetail.associate = (models) => {
  DeliveryDetail.belongsTo(models.Delivery, { foreignKey: 'delivery_id', onDelete: "CASCADE" });
  DeliveryDetail.belongsTo(models.Order, { foreignKey: 'order_id', onDelete: "CASCADE" });
};

module.exports = DeliveryDetail;