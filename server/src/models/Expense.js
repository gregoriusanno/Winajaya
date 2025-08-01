const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Expense = sequelize.define('expenses', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  shift_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'shifts',
      key: 'id'
    }
  },
  name: {
    type : DataTypes.STRING
  },
  date: {
    type: DataTypes.DATEONLY
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2)
  },
  category: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  payment_method: {
    type: DataTypes.STRING
  },
  receipt: {
    type: DataTypes.STRING
  },
  type_account: {
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
  }
}, {
  paranoid: true,
  timestamps: true,
  tableName: 'expenses'
});

Expense.associate = (models) => {
  Expense.belongsTo(models.Shift, { foreignKey: 'shift_id', onDelete: "CASCADE" });
  Expense.belongsTo(models.User, { foreignKey: 'user_id', onDelete: "CASCADE" });
}

module.exports = Expense;