const constants = require('../../../constants');
const models = require('../../../models');

const { response: { error } } = constants;

module.exports = (id) => new Promise(async (resolve, reject) => {
  try {
    const category = await models.Category.findOne({ where: { id } });

    if (!category) {
      return reject(error.category.notExists);
    }

    await category.destroy();

    return resolve(category);
  } catch (error) {
    return reject(error);
  }
});