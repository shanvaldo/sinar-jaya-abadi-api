import { RESPONSE } from '../../../constants';
import models from '../../../models';

interface IInputUpdatePromotion {
  productId: string;
  order: number;
}

export default ({ productId, order }: IInputUpdatePromotion) => new Promise(async (resolve, reject) => {
  try {
    const promotion = await models.Promotion.findOne({ where: { productId } });

    if (!promotion) {
      return reject(RESPONSE.error.promotion.notExists);
    }

    const updatedPromotion = await promotion.update({
      order,
      productId,
    }, { returning: true });

    return resolve(updatedPromotion);
  } catch (error) {
    return reject(error);
  }
});
