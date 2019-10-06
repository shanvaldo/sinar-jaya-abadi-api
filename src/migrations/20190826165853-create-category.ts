import { QueryInterface, SequelizeStatic } from 'sequelize';

const tableName = 'Categories';

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

      name: {
        allowNull: false,
        type: sequelize.STRING,
      },

      label: {
        allowNull: false,
        type: sequelize.STRING,
      },

      description: {
        type: sequelize.TEXT,
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

    await queryInterface.addIndex(tableName, ['name'], {
      indexName: `${tableName}_name`,
      unique: true,
    });

    return;
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(tableName);
  },
};
