import { QueryInterface, SequelizeStatic } from 'sequelize';

import slugBuilder from '../utils/slugBuilder';

const tableName = 'Categories';
const columnNameSlug = 'slug';
const columnNameDeletedAt = 'deletedAt';

export default {
  up: async (queryInterface: QueryInterface, sequelize: SequelizeStatic) => {
    const categories = await queryInterface.sequelize.query(`SELECT * FROM "${tableName}";`, {
      type: sequelize.QueryTypes.SELECT,
    });

    await Promise.all([
      queryInterface.addColumn(tableName, columnNameSlug, { type: sequelize.STRING }),
      queryInterface.addColumn(tableName, columnNameDeletedAt, { type: sequelize.DATE }),
    ]);

    if (categories.length) {
      const query = categories.reduce((q: string, category: any) => {
        const slug = slugBuilder(category.name);

        return `${q} UPDATE "${tableName}" SET "${columnNameSlug}" = $$${slug}$$ WHERE "id" = $$${category.id}$$;`;
      }, '');

      await queryInterface.sequelize.query(query, {
        type: sequelize.QueryTypes.RAW,
      });
    }

    await queryInterface.sequelize.query(`
      ALTER TABLE "${tableName}" ALTER COLUMN "${columnNameSlug}" SET NOT NULL;

      DROP INDEX IF EXISTS ${tableName.toLowerCase()}_name;

      CREATE UNIQUE INDEX ${tableName.toLowerCase()}_name ON "${tableName}" ("name") WHERE "${columnNameDeletedAt}" IS NULL;
      CREATE UNIQUE INDEX ${tableName.toLowerCase()}_${columnNameSlug} ON "${tableName}" ("${columnNameSlug}") WHERE "${columnNameDeletedAt}" IS NULL;
    `, {
      type: sequelize.QueryTypes.RAW,
    });

    return;
  },

  down: async (queryInterface: QueryInterface, sequelize: SequelizeStatic) => {
    await queryInterface.sequelize.query(`
      DROP INDEX IF EXISTS ${tableName.toLowerCase()}_name;
      DROP INDEX IF EXISTS ${tableName.toLowerCase()}_${columnNameSlug};

      CREATE INDEX ${tableName.toLowerCase()}_name ON "${tableName}" ("name");
    `, {
      type: sequelize.QueryTypes.RAW,
    });

    await Promise.all([
      queryInterface.removeColumn(tableName, columnNameSlug),
      queryInterface.removeColumn(tableName, columnNameDeletedAt),
    ]);

    return;
  },
};
