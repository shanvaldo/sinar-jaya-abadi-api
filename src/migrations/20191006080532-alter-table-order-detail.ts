import { QueryInterface, SequelizeStatic } from 'sequelize';

const tableName = 'OrderDetails';

export default {
  up: async (queryInterface: QueryInterface, sequelize: SequelizeStatic) => {
    await queryInterface.changeColumn(tableName, 'note', {
      allowNull: true,
      type: sequelize.TEXT,
    });

    return;
  },

  down: async (queryInterface: QueryInterface, sequelize: SequelizeStatic) => {
    await queryInterface.changeColumn(tableName, 'note', {
      allowNull: false,
      type: sequelize.TEXT,
    });

    return;
  },
};
