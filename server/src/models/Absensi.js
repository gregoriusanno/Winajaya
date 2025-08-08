const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Absensi = sequelize.define(
  "absensi",
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
      allowNull: false,
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
    tableName: "absensi",
    createdAt: "created_at",
    updatedAt: "updated_at",
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
