const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User", // gunakan nama model PascalCase
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

User.associate = (models) => {
  User.hasMany(models.Salary, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  User.hasMany(models.Absensi, {
    foreignKey: "userId",
    as: "absensi",
  });
  User.hasMany(models.SuratLembur, {
    foreignKey: "userId",
    as: "lembur",
  });
};

module.exports = User;
