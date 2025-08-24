const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SuratLembur = sequelize.define(
  "surat_lembur",
  {
    surat_lemburId: {
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
    dateLembur: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
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
    tableName: "surat_lembur",
  }
);

SuratLembur.associate = (models) => {
  SuratLembur.belongsTo(models.User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
};

module.exports = SuratLembur;
