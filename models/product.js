'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.TEXT,
    subCategoryId: DataTypes.UUID,
    categoryId: DataTypes.UUID,
    sold: DataTypes.INTEGER,
    seen: DataTypes.INTEGER,
    isAvailable: DataTypes.BOOLEAN,
    weight: DataTypes.INTEGER,
    minOrder: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
  }, { paranoid: true });
  Product.associate = function(models) {
    Product.belongsTo(models.SubCategory, {
      as          : 'subCategory',
      foreignKey  : 'subCategoryId',
      targetKey   : 'id',
    });

    Product.belongsTo(models.Category, {
      as          : 'category',
      foreignKey  : 'categoryId',
      targetKey   : 'id',
    });

    Product.hasOne(models.Promotion, {
      as          : 'promotion',
      foreignKey  : 'productId',
    });

    Product.hasMany(models.ProductDetail, {
      as          : 'productImages',
      foreignKey  : 'productId',
      sourceKey   : 'id',
    });

    Product.hasMany(models.OrderDetail, {
      as          : 'orderDetails',
      foreignKey  : 'productId',
      sourceKey   : 'id',
    });
  };
  return Product;
};