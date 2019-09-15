const models = require('../../../models');
const slugBuilder = require('../../../utils/slugBuilder');

module.exports = ({ name, label, description }) => new Promise(async (resolve, reject) => {
  try {
    const category = await models.Category.create({
      name,
      slug: slugBuilder(name),
      label,
      description,
    });

    return resolve(category);
  } catch (error) {
    return reject(error.message || error);
  }
});