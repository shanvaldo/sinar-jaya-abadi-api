const models = require('../../../models');

module.exports = () => new Promise(async (resolve, reject) => {
  try {
    const categories = await models.Category.findAll({
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
    });

    return resolve(categories);
  } catch (error) {
    return reject(error);
  }
});