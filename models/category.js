'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    label: DataTypes.STRING,
    description: DataTypes.STRING
  }, { paranoid: true });
  Category.associate = function(models) {
    Category.hasMany(models.SubCategory, {
      as          : 'subCategories',
      foreignKey  : 'categoryId',
      sourceKey   : 'id',
    });

    Category.hasMany(models.Product, {
      as          : 'products',
      foreignKey  : 'categoryId',
      sourceKey   : 'id',
    });
  };
  return Category;
};