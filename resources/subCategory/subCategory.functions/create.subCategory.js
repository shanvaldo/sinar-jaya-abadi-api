const models = require('../../../models');
const slugBuilder = require('../../../utils/slugBuilder');

module.exports = ({ categoryId, name, label, description }) => new Promise(async (resolve, reject) => {
  try {
    const subCategory = await models.SubCategory.create({
      categoryId,
      name,
      slug: slugBuilder(name),
      label,
      description,
    });

    return resolve(subCategory);
  } catch (error) {
    return reject(error.message || error);
  }
});