import { QueryInterface, SequelizeStatic } from 'sequelize';

const tableName = 'CompanyInformation';
const newTableName = 'CompanyInformations';

export default {
  up: async (queryInterface: QueryInterface, sequelize: SequelizeStatic) => {
    await queryInterface.renameTable(tableName, newTableName);

    return;
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.renameTable(newTableName, tableName);

    return;
  },
};
