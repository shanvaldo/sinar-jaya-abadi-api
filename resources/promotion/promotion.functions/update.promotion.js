const constants = require('../../../constants');
const models = require('../../../models');

const { response: { error } } = constants;

module.exports = ({ productId, order }) => new Promise(async (resolve, reject) => {
  try {
    const promotion = await models.Promotion.findOne({ where: { productId } });

    if (!promotion) {
      return reject(error.promotion.notExists);
    }

    const updatedPromotion = await promotion.update({
      productId,
      order,
    }, { returning: true });

    return resolve(updatedPromotion);
  } catch (error) {
    return reject(error);
  }
});