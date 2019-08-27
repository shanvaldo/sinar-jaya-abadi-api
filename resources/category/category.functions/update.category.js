const constants = require('../../../constants');
const models = require('../../../models');

const { response: { error } } = constants;

module.exports = (id, { label, description }) => new Promise(async (resolve, reject) => {
  try {
    const category = await models.Category.findOne({ where: { id } });

    if (!category) {
      return reject(error.category.notExists);
    }

    const updatedCategory = await category.update({
      label,
      description,
    }, { returning: true });

    return resolve(updatedCategory);
  } catch (error) {
    return reject(error);
  }
});