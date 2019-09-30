import { RESPONSE } from '../../../constants';
import models from '../../../models';

export default (productId: string) => new Promise(async (resolve, reject) => {
  try {
    const promotion = await models.Promotion.findOne({ where: { productId } });

    if (!promotion) {
      return reject(RESPONSE.error.promotion.notExists);
    }

    await promotion.destroy();

    return resolve(promotion);
  } catch (error) {
    return reject(error);
  }
});
