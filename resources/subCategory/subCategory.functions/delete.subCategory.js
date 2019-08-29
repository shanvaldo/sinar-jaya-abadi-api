const constants = require('../../../constants');
const models = require('../../../models');

const { response: { error } } = constants;

module.exports = (id) => new Promise(async (resolve, reject) => {
  try {
    const subCategory = await models.SubCategory.findOne({ where: { id } });

    if (!subCategory) {
      return reject(error.subCategory.notExists);
    }

    await subCategory.destroy();

    return resolve(subCategory);
  } catch (error) {
    return reject(error);
  }
});