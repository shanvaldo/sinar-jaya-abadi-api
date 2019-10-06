import { QueryInterface, SequelizeStatic } from 'sequelize';

const tableName = 'Users';

export default {
  up: async (queryInterface: QueryInterface, sequelize: SequelizeStatic) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        defaultValue: sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        type: sequelize.UUID,
      },

      username: {
        allowNull: false,
        type: sequelize.STRING,
      },

      password: {
        allowNull: false,
        type: sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        defaultValue: sequelize.literal('now()'),
        type: sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        defaultValue: sequelize.literal('now()'),
        type: sequelize.DATE,
      },
    });

    return;
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(tableName);
  },
};
