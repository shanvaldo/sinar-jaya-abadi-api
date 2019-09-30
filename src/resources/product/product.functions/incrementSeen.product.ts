import { RESPONSE } from '../../../constants';
import models from '../../../models';

export default (id: string) => new Promise(async (resolve, reject) => {
  try {
    const product = await models.Product.findOne({ where: { id } });

    if (!product) {
      return reject(RESPONSE.error.news.notExists);
    }

    await product.update({ seen: product.seen + 1 });

    return resolve(true);
  } catch (error) {
    return reject(error);
  }
});
