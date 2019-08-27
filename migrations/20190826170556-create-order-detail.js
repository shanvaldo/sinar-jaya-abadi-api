'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('OrderDetails', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          productId: {
            allowNull: false,
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'Products',
            },
          },
          orderId: {
            allowNull: false,
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'Orders',
            },
          },
          quantity: {
            allowNull: false,
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          totalPrice: {
            allowNull: false,
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          note: {
            allowNull: false,
            type: Sequelize.TEXT
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('now()'),
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('now()'),
          }
        }).then(() => queryInterface.addIndex('OrderDetails', ['productId', 'orderId'], {
          fields: 'productId_orderId',
          unique: true,
        }));
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('OrderDetails');
  }
};