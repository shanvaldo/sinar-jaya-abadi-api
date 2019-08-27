'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('Products', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING
          },
          description: {
            type: Sequelize.TEXT
          },
          subCategoryId: {
            allowNull: false,
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'SubCategories',
            },
          },
          sold: {
            allowNull: false,
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          seen: {
            allowNull: false,
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          isAvailable: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
            defaultValue: true,
          },
          weight: {
            allowNull: false,
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          minOrder: {
            allowNull: false,
            type: Sequelize.INTEGER,
            defaultValue: 1,
          },
          price: {
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
        }).then(() => queryInterface.addIndex('Products', ['name'], {
          fields: 'name',
          unique: true,
        }));
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};