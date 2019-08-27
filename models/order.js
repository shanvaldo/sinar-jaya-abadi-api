'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    customerId: DataTypes.UUID,
    totalPrice: DataTypes.INTEGER,
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.Customer, {
      as          : 'customer',
      foreignKey  : 'customerId',
      targetKey   : 'id',
    });

    Order.hasMany(models.OrderDetail, {
      as          : 'orderDetails',
      foreignKey  : 'orderId',
      sourceKey   : 'id',
    });
  };
  return Order;
};