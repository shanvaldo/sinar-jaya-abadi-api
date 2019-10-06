import { QueryInterface, SequelizeStatic } from 'sequelize';

const tableName = 'Orders';

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

      customerId: {
        allowNull: false,
        references: {
          key: 'id',
          model: 'Customers',
        },
        type: sequelize.UUID,
      },

      totalPrice: {
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

    return;
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(tableName);
  },
};
