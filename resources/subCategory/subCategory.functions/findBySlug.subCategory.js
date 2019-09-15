const models = require('../../../models');

module.exports = (slug) => new Promise(async (resolve, reject) => {
  try {
    const subCategory = await models.SubCategory.findOne({
      include: [
        {
          as    : 'category',
          model : models.Category,
        },
        {
          as      : 'products',
          model   : models.Product,
          include : [
            {
              as    : 'productImages',
              model : models.ProductDetail,
            }
          ],
        }
      ],
      where: { slug },
    });

    return resolve(subCategory);
  } catch (error) {
    return reject(error);
  }
});