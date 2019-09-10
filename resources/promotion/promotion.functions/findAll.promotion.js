const models = require('../../../models');

module.exports = () => new Promise(async (resolve, reject) => {
  try {
    const promotions = await models.Promotion.findAll({
      include: [
        {
          as    : 'product',
          model : models.Product,
          include: [
            {
              as    : 'category',
              model : models.Category,
            },
            {
              as    : 'subCategory',
              model : models.SubCategory,
            },
            {
              as    : 'productImages',
              model : models.ProductDetail,
            },
          ],
        },
      ],
      order: [
        ['order', 'ASC'],
        ['product', 'productImages', 'order', 'ASC'],
      ],
    });

    const response = promotions.map(({ product }) => product);

    return resolve(response);
  } catch (error) {
    return reject(error);
  }
});