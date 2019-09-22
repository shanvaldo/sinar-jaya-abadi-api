import { RESPONSE } from '../../../constants';
import models from '../../../models';

export default (id: string) => new Promise(async (resolve, reject) => {
  const transaction = await models.sequelize.transaction();

  try {
    const product = await models.Product.findOne({ where: { id } });

    if (!product) {
      return reject(RESPONSE.error.product.notExists);
    }

    await models.Promotion.destroy({ transaction, where: { productId: id } }),
    await product.destroy({ transaction });

    await transaction.commit();

    return resolve(product);
  } catch (error) {
    await transaction.rollback();

    return reject(error);
  }
});
