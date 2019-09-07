const constants = require('../../../constants');
const models = require('../../../models');

const { response: { error } } = constants;

module.exports = (id, { title, content, coverImage }) => new Promise(async (resolve, reject) => {
  try {
    const news = await models.News.findOne({ where: { id } });

    if (!news) {
      return reject(error.news.notExists);
    }

    const updatedNews = await news.update({
      title,
      content,
      coverImage
    }, { returning: true });

    return resolve(updatedNews);
  } catch (error) {
    return reject(error);
  }
});