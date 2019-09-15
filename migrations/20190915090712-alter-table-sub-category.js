'use strict';

const slugBuilder = require('../utils/slugBuilder');

const tableName = 'SubCategories';
const columnNameSlug = 'slug';
const columnNameDeletedAt = 'deletedAt';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const subCategories = await queryInterface.sequelize.query(`SELECT * FROM "${tableName}";`, {
      type: Sequelize.QueryTypes.SELECT,
    });

    await Promise.all([
      queryInterface.addColumn(tableName, columnNameSlug, { type: Sequelize.STRING }),
      queryInterface.addColumn(tableName, columnNameDeletedAt, { type: Sequelize.DATE }),
    ]);

    if (subCategories.length) {
      const query = subCategories.reduce((q, subCategory) => {
        const slug = slugBuilder(subCategory.name);

        return `${q} UPDATE "${tableName}" SET "${columnNameSlug}" = $$${slug}$$ WHERE "id" = $$${subCategory.id}$$;`
      }, '');

      await queryInterface.sequelize.query(query, {
        type: Sequelize.QueryTypes.RAW,
      });
    }

    await queryInterface.sequelize.query(`
      ALTER TABLE "${tableName}" ALTER COLUMN "${columnNameSlug}" SET NOT NULL;

      DROP INDEX IF EXISTS ${tableName.toLowerCase()}_name;

      CREATE INDEX ${tableName.toLowerCase()}_name ON "${tableName}" ("name") WHERE "${columnNameDeletedAt}" IS NULL;
      CREATE INDEX ${tableName.toLowerCase()}_${columnNameSlug} ON "${tableName}" ("${columnNameSlug}") WHERE "${columnNameDeletedAt}" IS NULL;
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
