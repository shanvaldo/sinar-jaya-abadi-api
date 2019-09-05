const models = require('../../../models');

module.exports = (id) => new Promise(async (resolve, reject) => {
  try {
    const category = await models.Category.findOne({
      include: [
        {
          as      : 'subCategories',
          model   : models.SubCategory,
          include : [
            {
              as    : 'products',
              model : models.Product,
            }
          ],
        },
        {
          as    : 'products',
          model : models.Product,
        }
      ],
      where: { id },
    });

    return resolve(category);
  } catch (error) {
    return reject(error);
  }
});