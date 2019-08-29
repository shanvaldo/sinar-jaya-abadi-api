const models = require('../../../models');

module.exports = (id) => new Promise(async (resolve, reject) => {
  try {
    const subCategory = await models.SubCategory.findOne({ where: { id } });

    return resolve(subCategory);
  } catch (error) {
    return reject(error);
  }
});