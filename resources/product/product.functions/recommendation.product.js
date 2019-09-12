const models = require('../../../models');

module.exports = (productId, categoryId, limit) => new Promise(async (resolve, reject) => {
  try {
    const products = await models.Product.findAll({
      include: [
        {
          as      : 'category',
          model   : models.Category,
          required: true,
          where   : { id: categoryId },
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
      limit,
      order: [
        ['productImages', 'order', 'ASC'],
      ],
      where: { id: { [models.Sequelize.Op.ne]: productId } },
    });

    return resolve(products);
  } catch (error) {
    return reject(error);
  }
});