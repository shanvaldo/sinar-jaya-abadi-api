import { QueryInterface, SequelizeStatic } from 'sequelize';

import slugBuilder from '../utils/slugBuilder';

const tableName = 'SubCategories';
const columnNameSlug = 'slug';
const columnNameDeletedAt = 'deletedAt';

export default {
  up: async (queryInterface: QueryInterface, sequelize: SequelizeStatic) => {
    const subCategories = await queryInterface.sequelize.query(`SELECT * FROM "${tableName}";`, {
      type: sequelize.QueryTypes.SELECT,
    });

    await Promise.all([
      queryInterface.addColumn(tableName, columnNameSlug, { type: sequelize.STRING }),
      queryInterface.addColumn(tableName, columnNameDeletedAt, { type: sequelize.DATE }),
    ]);

    if (subCategories.length) {
      const query = subCategories.reduce((q: string, subCategory: any) => {
        const slug = slugBuilder(subCategory.name);

        return `${q} UPDATE "${tableName}" SET "${columnNameSlug}" = $$${slug}$$ WHERE "id" = $$${subCategory.id}$$;`;
      }, '');

      await queryInterface.sequelize.query(query, {
        type: sequelize.QueryTypes.RAW,
      });
    }

    await queryInterface.sequelize.query(`
      ALTER TABLE "${tableName}" ALTER COLUMN "${columnNameSlug}" SET NOT NULL;

      DROP INDEX IF EXISTS "${tableName}_categoryId_name";

      CREATE UNIQUE INDEX "${tableName}_categoryId_name" ON "${tableName}" ("categoryId", "name") WHERE "${columnNameDeletedAt}" IS NULL;
      CREATE UNIQUE INDEX "${tableName}_categoryId_${columnNameSlug}" ON "${tableName}" ("categoryId", "${columnNameSlug}") WHERE "${columnNameDeletedAt}" IS NULL;
    `, {
      type: sequelize.QueryTypes.RAW,
    });

    return;
  },

  down: async (queryInterface: QueryInterface, sequelize: SequelizeStatic) => {
    await queryInterface.sequelize.query(`
      DROP INDEX IF EXISTS "${tableName}_categoryId_name";
      DROP INDEX IF EXISTS "${tableName}_categoryId_${columnNameSlug}";

      CREATE INDEX "${tableName}_categoryId_name" ON "${tableName}" ("categoryId", "name");
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
