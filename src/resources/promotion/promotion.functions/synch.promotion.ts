import sequelize from 'sequelize';

import { RESPONSE } from '../../../constants';
import { IPromotionAttributes } from '../../../interfaces/IPromotion';
import models from '../../../models';

const maxPromotion = process.env.MAX_PROMOTION || 12;

const insertBulkDataToPromotion = (promotions: Array<IPromotionAttributes>, transaction: sequelize.Transaction) => {
  return Promise.all(promotions.map((promotion) => {
    return models.Promotion.create({
      order     : promotion.order,
      productId : promotion.productId,
    }, { transaction });
  }));
};

export default (promotions: Array<IPromotionAttributes>) => new Promise(async (resolve, reject) => {
  const transaction = await models.sequelize.transaction();

  try {
    if (promotions.length > maxPromotion) {
      return reject(RESPONSE.error.promotion.noSpace);
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
