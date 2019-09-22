import models from '../../../models';

export default (slugs: Array<string>) => new Promise(async (resolve, reject) => {
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
