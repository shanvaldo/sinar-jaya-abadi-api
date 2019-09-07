'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    email: DataTypes.STRING,
    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
  }, {});
  Customer.associate = function(models) {
    Customer.hasMany(models.Order, {
      as          : 'orders',
      foreignKey  : 'customerId',
      sourceKey   : 'id',
    });
  };
  return Customer;
};