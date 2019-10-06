import models from '../../../models';

export default () => new Promise(async (resolve, reject) => {
  try {
    const products = await models.Product.findAll({
      include: [
        {
          as    : 'productImages',
          model : models.ProductDetail,
        },
      ],
      order: [
        ['productImages', 'order', 'ASC'],
      ],
    });

    return resolve(products);
  } catch (error) {
    return reject(error);
  }
});
