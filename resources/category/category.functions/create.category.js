const models = require('../../../models');

module.exports = ({ name, label, description }) => new Promise(async (resolve, reject) => {
  try {
    const category = await models.Category.create({
      name,
      label,
      description,
    });

    return resolve(category);
  } catch (error) {
    return reject(error.message || error);
  }
});