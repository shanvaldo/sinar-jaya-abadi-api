'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    label: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Product, {
      as          : 'products',
      foreignKey  : 'categoryId',
      sourceKey   : 'id',
    });
  };
  return Category;
};