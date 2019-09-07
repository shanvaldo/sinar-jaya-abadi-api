const constants = require('../../../constants');
const models = require('../../../models');

const { response: { error } } = constants;

module.exports = (productId) => new Promise(async (resolve, reject) => {
  try {
    const promotion = await models.Promotion.findOne({ where: { productId } });

    if (!promotion) {
      return reject(error.promotion.notExists);
    }

    await promotion.destroy();

    return resolve(promotion);
  } catch (error) {
    return reject(error);
  }
});