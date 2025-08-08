const sequelize = require("../config/database");
const { Op, DataTypes } = require("sequelize");

// Import semua model
const User = require("./User");
const Absensi = require("./Absensi");
const SuratLembur = require("./SuratLembur");

// Export semua model dan tools Sequelize
module.exports = {
  sequelize,
  User,
  Absensi,
  SuratLembur,
  Op,
  DataTypes,
};
