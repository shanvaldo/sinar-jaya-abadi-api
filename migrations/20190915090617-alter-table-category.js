'use strict';

const slugBuilder = require('../utils/slugBuilder');

const tableName = 'Categories';
const columnNameSlug = 'slug';
const columnNameDeletedAt = 'deletedAt';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = await queryInterface.sequelize.query(`SELECT * FROM "${tableName}";`, {
      type: Sequelize.QueryTypes.SELECT,
    });

    await Promise.all([
      queryInterface.addColumn(tableName, columnNameSlug, { type: Sequelize.STRING }),
      queryInterface.addColumn(tableName, columnNameDeletedAt, { type: Sequelize.DATE }),
    ]);

    if (categories.length) {
      const query = categories.reduce((q, category) => {
        const slug = slugBuilder(category.name);

        return `${q} UPDATE "${tableName}" SET "${columnNameSlug}" = $$${slug}$$ WHERE "id" = $$${category.id}$$;`
      }, '');

      await queryInterface.sequelize.query(query, {
        type: Sequelize.QueryTypes.RAW,
      });
    }

    await queryInterface.sequelize.query(`
      ALTER TABLE "${tableName}" ALTER COLUMN "${columnNameSlug}" SET NOT NULL;

      DROP INDEX IF EXISTS ${tableName.toLowerCase()}_name;

      CREATE UNIQUE INDEX ${tableName.toLowerCase()}_name ON "${tableName}" ("name") WHERE "${columnNameDeletedAt}" IS NULL;
      CREATE UNIQUE INDEX ${tableName.toLowerCase()}_${columnNameSlug} ON "${tableName}" ("${columnNameSlug}") WHERE "${columnNameDeletedAt}" IS NULL;
    `, {
      type: Sequelize.QueryTypes.RAW,
    });

    return;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP INDEX IF EXISTS ${tableName.toLowerCase()}_name;
      DROP INDEX IF EXISTS ${tableName.toLowerCase()}_${columnNameSlug};

      CREATE INDEX ${tableName.toLowerCase()}_name ON "${tableName}" ("name");
    `, {
      type: Sequelize.QueryTypes.RAW,
    });

    await Promise.all([
      queryInterface.removeColumn(tableName, columnNameSlug),
      queryInterface.removeColumn(tableName, columnNameDeletedAt),
    ]);

    return;
  }
};
