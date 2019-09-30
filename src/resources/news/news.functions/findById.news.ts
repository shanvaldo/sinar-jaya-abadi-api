import models from '../../../models';
import { TNewsInstance } from '../../../models/news';

const findNextAndPrevId = (newsId: string): Promise<TNewsInstance> => new Promise(async (resolve, reject) => {
  try {
    const [news] = await models.sequelize.query(`
      SELECT *
      FROM (
        SELECT  "id", "createdAt",
          LAG("id") OVER (ORDER BY "createdAt") AS "previousNewsId",
          LEAD("id") OVER (ORDER BY "createdAt") AS "nextNewsId"
        FROM "News"
        ) x
      WHERE "id" = '${newsId}';
    `, {
      type: models.Sequelize.QueryTypes.SELECT,
    });

    return resolve(news);
  } catch (error) {
    return reject(error);
  }
});

export default (ids: Array<string>): Promise<Array<TNewsInstance | any>> => new Promise(async (resolve, reject) => {
  try {
    const news = await models.News.findAll({
      order: [['createdAt', 'DESC']],
      where: { id: { [models.sequelize.Op.in]: ids } },
    });

    const response = await Promise.all(news.map(async (n) => {
      const { previousNewsId, nextNewsId } = await findNextAndPrevId(n.id);

      return { ...n.toJSON(), previousNewsId, nextNewsId };
    }));

    return resolve(response);
  } catch (error) {
    return reject(error);
  }
});
