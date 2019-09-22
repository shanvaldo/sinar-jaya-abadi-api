import { QueryInterface, SequelizeStatic } from 'sequelize';

const tableName = 'CompanyInformation';

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

      companyName: {
        allowNull: false,
        type: sequelize.STRING,
      },

      street: {
        type: sequelize.TEXT,
      },

      city: {
        type: sequelize.TEXT,
      },

      state: {
        type: sequelize.TEXT,
      },

      postCode: {
        type: sequelize.STRING,
      },

      phones: {
        type: sequelize.ARRAY(sequelize.STRING),
      },

      emails: {
        type: sequelize.ARRAY(sequelize.STRING),
      },

      facebook: {
        type: sequelize.STRING,
      },

      twitter: {
        type: sequelize.STRING,
      },

      instagram: {
        type: sequelize.STRING,
      },

      linkedIn: {
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
