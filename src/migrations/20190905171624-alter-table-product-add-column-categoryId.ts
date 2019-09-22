import { QueryInterface, SequelizeStatic } from 'sequelize';

const tableName = 'Products';
const columnName = 'categoryId';

export default {
  up: (queryInterface: QueryInterface, sequelize: SequelizeStatic) => {
    return Promise.all([
      queryInterface.addColumn(tableName, columnName, {
        references: {
          key: 'id',
          model: 'Categories',
        },
        type: sequelize.UUID,
      }),
      queryInterface.changeColumn(tableName, 'subCategoryId', {
        allowNull: true,
        type: sequelize.UUID,
      }),
    ]);
  },

  down: (queryInterface: QueryInterface, sequelize: SequelizeStatic) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, columnName),
      queryInterface.changeColumn(tableName, 'subCategoryId', {
        allowNull: false,
        type: sequelize.UUID,
      }),
    ]);
  },
};
