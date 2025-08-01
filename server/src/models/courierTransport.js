const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const CourierTransport = sequelize.define('CourierTransport', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  odo_start: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  odo_end: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_fuel_cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'courier_transports',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

// Definisikan relasi
CourierTransport.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(CourierTransport, { foreignKey: 'user_id' });

module.exports = CourierTransport;