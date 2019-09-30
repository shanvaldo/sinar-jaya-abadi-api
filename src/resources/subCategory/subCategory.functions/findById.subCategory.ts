import models from '../../../models';
import { TSubCategoryInstance } from '../../../models/subCategory';

export default (ids: Array<string>): Promise<Array<TSubCategoryInstance>> => new Promise(async (resolve, reject) => {
  try {
    const subCategories = await models.SubCategory.findAll({
      where: { id: { [models.sequelize.Op.in]: ids } },
    });

    return resolve(subCategories);
  } catch (error) {
    return reject(error);
  }
});
