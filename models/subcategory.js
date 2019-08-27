'use strict';
module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define('SubCategory', {
    categoryId: DataTypes.UUID,
    name: DataTypes.STRING,
    label: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {});
  SubCategory.associate = function(models) {
    SubCategory.belongsTo(models.Category, {
      as          : 'category',
      foreignKey  : 'categoryId',
      targetKey   : 'id',
    });
  };
  return SubCategory;
};