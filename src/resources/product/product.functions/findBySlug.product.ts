import models from '../../../models';
import { TProductInstance } from '../../../models/product';

export default (slugs: Array<string>): Promise<Array<TProductInstance>> => new Promise(async (resolve, reject) => {
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
      where: { slug: { [models.sequelize.Op.in]: slugs } },
    });

    return resolve(product);
  } catch (error) {
    return reject(error);
  }
});
