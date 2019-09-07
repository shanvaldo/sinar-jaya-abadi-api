const constants = require('../../../constants');
const models = require('../../../models');

const { response: { error } } = constants;

module.exports = (id) => new Promise(async (resolve, reject) => {
  try {
    const news = await models.News.findOne({ where: { id } });

    if (!news) {
      return reject(error.news.notExists);
    }

    await news.destroy();

    return resolve(news);
  } catch (error) {
    return reject(error);
  }
});