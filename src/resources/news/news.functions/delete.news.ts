import { RESPONSE } from '../../../constants';
import models from '../../../models';

export default (id: string) => new Promise(async (resolve, reject) => {
  try {
    const news = await models.News.findOne({ where: { id } });

    if (!news) {
      return reject(RESPONSE.error.news.notExists);
    }

    await news.destroy();

    return resolve(news);
  } catch (error) {
    return reject(error);
  }
});
