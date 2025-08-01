const sequelize = require('../config/database');
const { Op, DataTypes } = require('sequelize');

const Customer = require('./Customer');
const Order = require('./Order');
const OrderDetail = require('./OrderDetail');
const Treatment = require('./Treatment');
const Item = require('./Item');
const User = require('./User');
const ShoePhoto = require('./ShoesPhoto');
const Branch = require('./Branch');
const Payment = require('./Payment');
const Discount = require('./Discount');
const Delivery = require('./Delivery');
const DeliveryDetail = require('./DeliveryDetail');
const Shift = require('./Shift');
const Absent = require('./Absent');
const Expense = require('./Expense');
// const CapitalRecord = require('./CapitalRecord');
// const Product = require('./Product');
// const OrderProduct = require('./OrderProduct');
// const OrderProductDetail = require('./OrderProductDetail');
// const Membership = require('./Membership');
// const Collaboration = require('./Collaboration');
// const Business = require('./Business');
const Expenses = require('./Expense');
const CourierTransport = require('./courierTransport');

Order.belongsTo(Customer, { foreignKey: 'customer_id' });
Order.belongsTo(Branch, { foreignKey: 'branch_id' });
Order.belongsTo(Payment, { foreignKey: 'payment_id', as : 'payment' });
Order.hasMany(OrderDetail, { foreignKey: 'order_id', as: 'order_details' });
OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });
OrderDetail.belongsTo(User, { foreignKey: 'employee_id', as: 'employee' });
OrderDetail.belongsTo(Treatment, { foreignKey: 'treatment_id' });
OrderDetail.belongsTo(Item, { as: 'item', foreignKey: 'item_id' });
Item.hasMany(OrderDetail, { as: 'order_details', foreignKey: 'item_id' });
OrderDetail.belongsTo(Discount, { foreignKey: 'discount_id' });
ShoePhoto.belongsTo(OrderDetail, { foreignKey: 'order_detail_id' });
Customer.hasMany(Order, { foreignKey: 'customer_id', as : 'orders' });
Branch.hasMany(Order, { foreignKey: 'branch_id' });
Payment.hasMany(Order, { foreignKey: 'payment_id', as : 'order' });
User.hasMany(OrderDetail, { foreignKey: 'employee_id', as: 'employee' });
Treatment.hasMany(OrderDetail, { foreignKey: 'treatment_id' });
OrderDetail.hasMany(ShoePhoto, { foreignKey: 'order_detail_id' });
Discount.hasMany(OrderDetail, { foreignKey: 'discount_id' });
Delivery.belongsTo(User, { foreignKey: 'users_id' });
Delivery.hasMany(DeliveryDetail, { foreignKey: 'delivery_id' });
DeliveryDetail.belongsTo(Order, { foreignKey: 'order_id' });
DeliveryDetail.belongsTo(Delivery, { foreignKey: 'delivery_id' });
Shift.belongsTo(User, { foreignKey: 'employee_id', as: 'employee_shift' });
User.hasMany(Shift, { foreignKey: 'employee_id', as: 'employee_shift' });
Absent.belongsTo(User, { foreignKey: 'employee_id', as: 'employee_absent' });
User.hasMany(Absent, { foreignKey: 'employee_id', as: 'employee_absent' });
Expense.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Expense, { foreignKey: 'user_id' });
// CapitalRecord.belongsTo(User, { foreignKey: 'user_id' });
// User.hasMany(CapitalRecord, { foreignKey: 'user_id', as: 'capital_records' });
// Product.belongsTo(Branch, { foreignKey: 'branch_id' });
// OrderProduct.belongsTo(Customer, { foreignKey: 'customer_id' });
// OrderProduct.belongsTo(Branch, { foreignKey: 'branch_id' });
// OrderProduct.belongsTo(Payment, { foreignKey: 'payment_id' });
// OrderProduct.belongsTo(Discount, { foreignKey: 'discount_id' });
// OrderProduct.hasMany(OrderProductDetail, { foreignKey: 'order_product_id', as: 'order_product_details' });
// OrderProductDetail.belongsTo(OrderProduct, { foreignKey: 'order_product_id' });
// OrderProductDetail.belongsTo(Product, { foreignKey: 'product_id' });
// OrderProductDetail.belongsTo(Discount, { foreignKey: 'discount_id' });
// Membership.belongsTo(Customer, { foreignKey: 'customer_id' });
// Membership.belongsTo(Payment, { foreignKey: 'payment_id' });
// Customer.hasMany(Membership, { foreignKey: 'customer_id' });
// Payment.hasMany(Membership, { foreignKey: 'payment_id' });
// Collaboration.belongsTo(Business, { foreignKey: 'business_id' });
// Business.hasMany(Collaboration, { foreignKey: 'business_id' });
Shift.hasMany(Expenses, { foreignKey: 'shift_id' });
Expenses.belongsTo(Shift, { foreignKey: 'shift_id' });

// Tambahkan relasi User-Branch
User.belongsTo(Branch, { 
    foreignKey: 'branch_id', 
    as: 'branch' 
});

Branch.hasMany(User, { 
    foreignKey: 'branch_id', 
    as: 'users' 
});

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
    Op
};