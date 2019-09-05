const models = require('../../../models');

module.exports = ({ title, content, coverImage }) => new Promise(async (resolve, reject) => {
  try {
    const news = await models.News.findOrCreate({
      title,
      content,
      coverImage
    });

    return resolve(news);
  } catch (error) {
    return reject(error.message || error);
  }
});