import models from '../../../models';
import { TProductInstance } from '../../../models/product';

export default (ids: Array<string>): Promise<Array<TProductInstance>> => new Promise(async (resolve, reject) => {
  try {
    const product = await models.Product.findAll({
      include: [
        {
          as    : 'productImages',
          model : models.ProductDetail,
        },
      ],
      order: [
        ['productImages', 'order', 'ASC'],
      ],
      where: { id: { [models.sequelize.Op.in]: ids } },
    });

    return resolve(product);
  } catch (error) {
    return reject(error);
  }
});
