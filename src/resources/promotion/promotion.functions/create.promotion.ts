import { RESPONSE } from '../../../constants';
import models from '../../../models';

const maxPromotion = process.env.MAX_PROMOTION || 12;

interface IInputCreatePromotion {
  productId: string;
  order: number;
}

export default ({ productId, order }: IInputCreatePromotion) => new Promise(async (resolve, reject) => {
  try {
    const isPromotionNotMax = await models.Promotion.count();

    if (isPromotionNotMax >= maxPromotion) {
      return reject(RESPONSE.error.promotion.noSpace);
    }

    const promotion = await models.Promotion.create({ productId, order });

    return resolve(promotion);
  } catch (error) {
    return reject(error.message || error);
  }
});
