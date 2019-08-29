const models = require('../../../models');

module.exports = (id) => new Promise(async (resolve, reject) => {
  try {
    const product = await models.Product.findOne({
      include: [
        {
          as      : 'subCategory',
          include : [
            {
              as    : 'category',
              model : models.Category,
            }
          ],
          model : models.SubCategory,
        },
        {
          as    : 'productImages',
          model : models.ProductDetail,
        }
      ],
      where: { id },
    });

    return resolve(product);
  } catch (error) {
    return reject(error);
  }
});