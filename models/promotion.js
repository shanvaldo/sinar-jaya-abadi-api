'use strict';
module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define('Promotion', {
    productId: DataTypes.UUID,
    order: DataTypes.INTEGER,
  }, {});
  Promotion.associate = function(models) {
    Promotion.belongsTo(models.Product, {
      as          : 'product',
      foreignKey  : 'productId',
      targetKey   : 'id',
    });
  };
  return Promotion;
};