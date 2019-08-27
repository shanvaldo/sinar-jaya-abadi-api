'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('Promotions', {
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
          order: {
            allowNull: false,
            type: Sequelize.INTEGER
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
        }).then(() => queryInterface.addIndex('Promotions', ['productId'], {
          fields: 'productId',
          unique: true,
        }));
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Promotions');
  }
};