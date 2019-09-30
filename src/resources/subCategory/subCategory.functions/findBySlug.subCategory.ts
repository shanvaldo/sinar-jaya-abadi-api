import models from '../../../models';
import { TSubCategoryInstance } from '../../../models/subCategory';

export default (slugs: Array<string>): Promise<Array<TSubCategoryInstance>> => new Promise(async (resolve, reject) => {
  try {
    const subCategories = await models.SubCategory.findAll({
      where: { slug: { [models.sequelize.Op.in]: slugs } },
    });

    return resolve(subCategories);
  } catch (error) {
    return reject(error);
  }
});
