const models = require('../../../models');

module.exports = (slug) => new Promise(async (resolve, reject) => {
  try {
    const category = await models.Category.findOne({
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
      where: { slug },
    });

    return resolve(category);
  } catch (error) {
    return reject(error);
  }
});