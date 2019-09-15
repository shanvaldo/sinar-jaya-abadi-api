const models = require('../../../models');

module.exports = (id) => new Promise(async (resolve, reject) => {
  try {
    await models.Product.update({
      seen: models.Sequelize.literal(`seen + 1`),
    }, { where: { id } });

    return resolve(true);
  } catch (error) {
    return reject(error);
  }
});