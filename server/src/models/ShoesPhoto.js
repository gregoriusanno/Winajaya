const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ShoePhoto = sequelize.define('shoes_photos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    order_detail_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'order_details',
            key: 'id'
        }
    },
    url_photo: {
        type: DataTypes.STRING,
        allowNull: false
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
    },
}, {
    paranoid: true,
    timestamps: true,
    tableName: 'shoes_photos'
});

ShoePhoto.associate = (models) => {
    ShoePhoto.belongsTo(models.OrderDetail, { foreignKey: 'order_detail_id', onDelete: "CASCADE" });
}

module.exports = ShoePhoto;