'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    productId: DataTypes.UUID,
    orderId: DataTypes.UUID,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    note: DataTypes.TEXT
  }, {});
  OrderDetail.associate = function(models) {
    OrderDetail.belongsTo(models.Product, {
      as          : 'product',
      foreignKey  : 'productId',
      sourceKey   : 'id',
    });

    OrderDetail.belongsTo(models.Order, {
      as          : 'order',
      foreignKey  : 'orderId',
      sourceKey   : 'id',
    });
  };
  return OrderDetail;
};