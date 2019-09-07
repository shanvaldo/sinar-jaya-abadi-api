const models = require('../../../models');

module.exports = () => new Promise(async (resolve, reject) => {
  try {
    const products = await models.Product.findAll({
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
    });

    return resolve(products);
  } catch (error) {
    return reject(error);
  }
});