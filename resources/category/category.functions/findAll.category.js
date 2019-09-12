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
          where : {
            subCategoryId: { [models.Sequelize.Op.eq]: null },
          },
          required: false,
        }
      ],
    });

    return resolve(categories);
  } catch (error) {
    return reject(error);
  }
});