const models = require('../../../models');

module.exports = () => new Promise(async (resolve, reject) => {
  try {
    const subCategories = await models.SubCategory.findAll();

    return resolve(subCategories);
  } catch (error) {
    return reject(error);
  }
});