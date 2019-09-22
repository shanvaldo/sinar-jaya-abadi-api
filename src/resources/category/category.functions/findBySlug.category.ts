import models from '../../../models';
import { TCategoryInstance } from '../../../models/category';

export default (slugs: Array<string>): Promise<Array<TCategoryInstance>> => new Promise(async (resolve, reject) => {
  try {
    const category = await models.Category.findAll({ where: { slug: { [models.sequelize.Op.in]: slugs } } });

    return resolve(category);
  } catch (error) {
    return reject(error);
  }
});
