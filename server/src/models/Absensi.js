const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Absensi = sequelize.define(
  "Absensi",
  {
    absensiId: {
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
    clockIn: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    clockOut: {
      type: DataTypes.TIME,
      allowNull: true, // <-- ubah jadi true
    },
    duration: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    dateWork: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    salaryDay: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusLembur: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    validasiLembur: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "absensi",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
  }
);

Absensi.associate = (models) => {
  Absensi.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user_absensi",
    onDelete: "CASCADE",
  });
};

module.exports = Absensi;
