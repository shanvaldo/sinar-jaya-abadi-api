const constants = require('../../../constants');
const models = require('../../../models');

const { response: { error } } = constants;
const maxPromotion = process.env.MAX_PROMOTION || 12;

module.exports = ({ productId, order }) => new Promise(async (resolve, reject) => {
  try {
    const isPromotionNotMax = await models.Promotion.count();

    if (isPromotionNotMax >= maxPromotion) {
      return reject(error.promotion.noSpace);
    }

    const promotion = await models.Promotion.create({ productId, order });

    return resolve(promotion);
  } catch (error) {
    return reject(error.message || error);
  }
});