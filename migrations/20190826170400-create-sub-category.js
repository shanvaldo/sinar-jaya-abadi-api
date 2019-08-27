'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('SubCategories', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          categoryId: {
            allowNull: false,
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'Categories',
            },
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING
          },
          label: {
            allowNull: false,
            type: Sequelize.STRING
          },
          description: {
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
        }).then(() => queryInterface.addIndex('SubCategories', ['categoryId', 'name'], {
          fields: 'categoryId_name',
          unique: true,
        }));
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SubCategories');
  }
};