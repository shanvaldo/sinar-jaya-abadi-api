const models = require('../../../models');

module.exports = (id) => new Promise(async (resolve, reject) => {
  try {
    const category = await models.Category.findOne({ where: { id } });

    return resolve(category);
  } catch (error) {
    return reject(error);
  }
});