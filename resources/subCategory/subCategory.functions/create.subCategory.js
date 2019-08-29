const models = require('../../../models');

module.exports = ({ categoryId, name, label, description }) => new Promise(async (resolve, reject) => {
  try {
    const subCategory = await models.SubCategory.create({
      categoryId,
      name,
      label,
      description,
    });

    return resolve(subCategory);
  } catch (error) {
    return reject(error.message || error);
  }
});