import { QueryInterface, SequelizeStatic } from 'sequelize';

const tableName = 'Products';

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

      description: {
        type: sequelize.TEXT,
      },

      subCategoryId: {
        allowNull: false,
        references: {
          key: 'id',
          model: 'SubCategories',
        },
        type: sequelize.UUID,
      },

      sold: {
        allowNull: false,
        defaultValue: 0,
        type: sequelize.INTEGER,
      },

      seen: {
        allowNull: false,
        defaultValue: 0,
        type: sequelize.INTEGER,
      },

      isAvailable: {
        allowNull: false,
        defaultValue: true,
        type: sequelize.BOOLEAN,
      },

      weight: {
        allowNull: false,
        defaultValue: 0,
        type: sequelize.INTEGER,
      },

      minOrder: {
        allowNull: false,
        defaultValue: 1,
        type: sequelize.INTEGER,
      },

      price: {
        allowNull: false,
        type: sequelize.INTEGER,
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

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(tableName);
  },
};
