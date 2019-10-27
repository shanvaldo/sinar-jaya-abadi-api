import { QueryInterface, SequelizeStatic } from 'sequelize';

const tableName = 'Orders';
const columnName = 'address';

export default {
  up: async (queryInterface: QueryInterface, sequelize: SequelizeStatic) => {
    await queryInterface.addColumn(tableName, columnName, {
      type: sequelize.TEXT,
    });

    return;
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn(tableName, columnName);

    return;
  },
};
