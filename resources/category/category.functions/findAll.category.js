const models = require('../../../models');

module.exports = () => new Promise(async (resolve, reject) => {
  try {
    const categories = await models.Category.findAll();

    return resolve(categories);
  } catch (error) {
    return reject(error);
  }
});