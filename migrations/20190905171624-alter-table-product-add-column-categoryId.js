'use strict';

const tableName = 'Products';
const columnName = 'categoryId';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, columnName, {
        type: Sequelize.UUID,
        references: {
          model: 'Categories',
          key: 'id',
        },
      }),
      queryInterface.changeColumn(tableName, 'subCategoryId', {
        type: Sequelize.UUID,
        allowNull: true
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, columnName),
      queryInterface.changeColumn(tableName, 'subCategoryId', {
        type: Sequelize.UUID,
        allowNull: false
      }),
    ]);
  }
};
