const models = require('../../../models');

module.exports = (slug) => new Promise(async (resolve, reject) => {
  try {
    const product = await models.Product.findOne({
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
        }
      ],
      order: [
        ['productImages', 'order', 'ASC'],
      ],
      where: { slug },
    });

    return resolve(product);
  } catch (error) {
    return reject(error);
  }
});