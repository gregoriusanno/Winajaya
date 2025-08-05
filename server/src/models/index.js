const sequelize = require("../config/database");
const { Op, DataTypes } = require("sequelize");

const Customer = require("./Customer");
const Order = require("./SuratLembur");
const OrderDetail = require("./OrderDetail");
const Treatment = require("./Treatment");
const Item = require("./Item");
const User = require("./User");
const ShoePhoto = require("./ShoesPhoto");
const Branch = require("./Branch");
const Payment = require("./Payment");
const Discount = require("./Discount");
const Delivery = require("./Delivery");
const DeliveryDetail = require("./DeliveryDetail");
const Shift = require("./Shift");
const Absent = require("./Absent");
const Expense = require("./Salary");
// const CapitalRecord = require('./CapitalRecord');
// const Product = require('./Product');
// const OrderProduct = require('./OrderProduct');
// const OrderProductDetail = require('./OrderProductDetail');
// const Membership = require('./Membership');
// const Collaboration = require('./Collaboration');
// const Business = require('./Business');
const Expenses = require("./Salary");
const CourierTransport = require("./courierTransport");
// User.hasMany(, { foreignKey: "employee_id", as: "employee" });
// User.hasMany(Shift, { foreignKey: "employee_id", as: "employee_shift" });
// User.hasMany(Absent, { foreignKey: "employee_id", as: "employee_absent" });
// User.hasMany(Expense, { foreignKey: "user_id" });

// User.belongsTo(Branch, {
//   foreignKey: "branch_id",
//   as: "branch",
// });

// Branch.hasMany(User, {
//   foreignKey: "branch_id",
//   as: "users",
// });

module.exports = {
  Customer,
  Order,
  OrderDetail,
  Treatment,
  Item,
  User,
  ShoePhoto,
  Branch,
  Payment,
  Discount,
  Delivery,
  DeliveryDetail,
  Shift,
  Absent,
  Expense,
  // CapitalRecord,
  // Product,
  // OrderProduct,
  // OrderProductDetail,
  // Membership,
  // Collaboration,
  // Business,
  CourierTransport,
  sequelize,
  DataTypes,
  Op,
};
