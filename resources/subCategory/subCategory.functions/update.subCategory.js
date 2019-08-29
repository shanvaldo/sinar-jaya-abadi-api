const constants = require('../../../constants');
const models = require('../../../models');

const { response: { error } } = constants;

module.exports = (id, { label, description }) => new Promise(async (resolve, reject) => {
  try {
    const subCategory = await models.SubCategory.findOne({ where: { id } });

    if (!subCategory) {
      return reject(error.subCategory.notExists);
    }

    const updatedSubCategory = await subCategory.update({
      label,
      description,
    }, { returning: true });

    return resolve(updatedSubCategory);
  } catch (error) {
    return reject(error);
  }
});