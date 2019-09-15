'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define('SubCategory', {
    categoryId: DataTypes.UUID,
    name: DataTypes.STRING,
    label: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, { paranoid: true });
  SubCategory.associate = function(models) {
    SubCategory.belongsTo(models.Category, {
      as          : 'category',
      foreignKey  : 'categoryId',
      targetKey   : 'id',
    });

    SubCategory.hasMany(models.Product, {
      as          : 'products',
      foreignKey  : 'subCategoryId',
      sourceKey   : 'id',
    });
  };
  return SubCategory;
};