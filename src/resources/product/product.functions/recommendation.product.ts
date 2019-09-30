import models from '../../../models';

interface IInputRecommendationProduct {
  productId: string;
  categoryId: string;
  limit: number;
}

export default (input: IInputRecommendationProduct) => new Promise(async (resolve, reject) => {
  try {
    const products = await models.Product.findAll({
      include: [
        {
          as      : 'category',
          model   : models.Category,
          required: true,
          where   : { id: input.categoryId },
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
      limit: input.limit,
      order: [
        ['productImages', 'order', 'ASC'],
      ],
      where: { id: { [models.Sequelize.Op.ne]: input.productId } },
    });

    return resolve(products);
  } catch (error) {
    return reject(error);
  }
});
