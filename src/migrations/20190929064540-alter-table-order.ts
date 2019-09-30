import { QueryInterface, SequelizeStatic } from 'sequelize';

const tableName = 'Orders';
const columnName = 'code';

export default {
  up: async (queryInterface: QueryInterface, sequelize: SequelizeStatic) => {
    await queryInterface.addColumn(tableName, columnName, {
      type: sequelize.STRING,
    });

    await queryInterface.addIndex(tableName, [columnName], {
      indexName: `${tableName}_${columnName}`,
      unique: true,
    });

    return;
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeIndex(tableName, `${tableName}_${columnName}`);

    await queryInterface.removeColumn(tableName, columnName);

    return;
  },
};
