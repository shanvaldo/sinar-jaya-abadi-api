const constants = require('../../../constants');
const models = require('../../../models');

const { response: { error } } = constants;
const maxPromotion = process.env.MAX_PROMOTION || 12;

const insertBulkDataToPromotion = (promotions, transaction) => Promise.all(promotions.map((promotion) => {
  return models.Promotion.create({
    productId : promotion.productId,
    order     : promotion.order,
  }, { transaction });
}));

module.exports = (promotions) => new Promise(async (resolve, reject) => {
  const transaction = await models.sequelize.transaction().catch((error) => reject(error));

  try {
    if (promotions.length > maxPromotion) {
      return reject(error.promotion.noSpace);
    }

    await models.Promotion.destroy({ transaction, where: {} });

    const newPromotions = await insertBulkDataToPromotion(promotions, transaction);

    await transaction.commit();

    return resolve(newPromotions);
  } catch (error) {
    await transaction.rollback();

    return reject(error.message || error);
  }
});