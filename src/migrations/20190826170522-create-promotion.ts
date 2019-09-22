import { QueryInterface, SequelizeStatic } from 'sequelize';

const tableName = 'Promotions';

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

      productId: {
        allowNull: false,
        references: {
          key: 'id',
          model: 'Products',
        },
        type: sequelize.UUID,
      },

      order: {
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

    await queryInterface.addIndex(tableName, ['productId'], {
      indexName: `${tableName}_productId`,
      unique: true,
    });

    return;
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(tableName);
  },
};
