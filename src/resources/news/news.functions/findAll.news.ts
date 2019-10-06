import models from '../../../models';

export default () => new Promise(async (resolve, reject) => {
  try {
    const news = await models.News.findAll();

    return resolve(news);
  } catch (error) {
    return reject(error);
  }
});
