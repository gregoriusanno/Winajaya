const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Salary = sequelize.define(
  "salary",
  {
    salaryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "userId",
      },
    },
    month: {
      type: DataTypes.STRING,
    },
    salaryMonth: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    paranoid: true,
    timestamps: true,
    tableName: "salary",
  }
);

Salary.associate = (models) => {
  Salary.belongsTo(models.User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
};

module.exports = Expense;
