import models from '../../../models';

export default (id: string) => new Promise(async (resolve, reject) => {
  try {
    const news = await models.News.findOne({ where: { id } });

    return resolve(news);
  } catch (error) {
    return reject(error);
  }
});
