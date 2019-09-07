'use strict';

const tableName = 'Customers';
const columnName = 'fullName';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.STRING,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(tableName, columnName);
  }
};
