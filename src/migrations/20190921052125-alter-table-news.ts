import { QueryInterface, SequelizeStatic } from 'sequelize';

import slugBuilder from '../utils/slugBuilder';

const tableName = 'News';
const columnNameSlug = 'slug';

export default {
  up: async (queryInterface: QueryInterface, sequelize: SequelizeStatic) => {
    const news = await queryInterface.sequelize.query(`SELECT * FROM "${tableName}";`, {
      type: sequelize.QueryTypes.SELECT,
    });

    await queryInterface.addColumn(tableName, columnNameSlug, { type: sequelize.STRING });

    if (news.length) {
      const query = news.reduce((q: string, newsDetail: any) => {
        const slug = slugBuilder(newsDetail.title);

        return `${q} UPDATE "${tableName}" SET "${columnNameSlug}" = $$${slug}$$ WHERE "id" = $$${newsDetail.id}$$;`;
      }, '');

      await queryInterface.sequelize.query(query, {
        type: sequelize.QueryTypes.RAW,
      });
    }

    await queryInterface.sequelize.query(`
      ALTER TABLE "${tableName}" ALTER COLUMN "${columnNameSlug}" SET NOT NULL;

      CREATE UNIQUE INDEX "${tableName}_title" ON "${tableName}" ("title");
      CREATE UNIQUE INDEX "${tableName}_${columnNameSlug}" ON "${tableName}" ("${columnNameSlug}");
    `, {
      type: sequelize.QueryTypes.RAW,
    });

    return;
  },

  down: async (queryInterface: QueryInterface, sequelize: SequelizeStatic) => {
    await queryInterface.sequelize.query(`
      DROP INDEX IF EXISTS "${tableName}_title";
      DROP INDEX IF EXISTS "${tableName}_${columnNameSlug}";
    `, {
      type: sequelize.QueryTypes.RAW,
    });

    await queryInterface.removeColumn(tableName, columnNameSlug);

    return;
  },
};
