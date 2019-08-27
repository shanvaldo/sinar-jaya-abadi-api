'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductDetail = sequelize.define('ProductDetail', {
    productId: DataTypes.UUID,
    linkImage: DataTypes.STRING,
    order: DataTypes.INTEGER,
  }, {});
  ProductDetail.associate = function(models) {
    ProductDetail.belongsTo(models.Product, {
      as          : 'product',
      foreignKey  : 'productId',
      targetKey   : 'id',
    });
  };
  return ProductDetail;
};