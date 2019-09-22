import { QueryInterface, SequelizeStatic } from 'sequelize';

const tableName = 'Customers';
const columnName = 'fullName';

export default {
  up: (queryInterface: QueryInterface, sequelize: SequelizeStatic) => {
    return queryInterface.addColumn(tableName, columnName, {
      type: sequelize.STRING,
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeColumn(tableName, columnName);
  },
};
