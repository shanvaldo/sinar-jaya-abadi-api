import { QueryInterface, SequelizeStatic } from 'sequelize';

const tableName = 'OrderDetails';

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

      orderId: {
        allowNull: false,
        references: {
          key: 'id',
          model: 'Orders',
        },
        type: sequelize.UUID,
      },

      quantity: {
        allowNull: false,
        defaultValue: 0,
        type: sequelize.INTEGER,
      },

      totalPrice: {
        allowNull: false,
        defaultValue: 0,
        type: sequelize.INTEGER,
      },

      note: {
        allowNull: false,
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

    await queryInterface.addIndex(tableName, ['productId', 'orderId'], {
      indexName: `${tableName}_productId_orderId`,
      unique: true,
    });

    return;
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(tableName);
  },
};
