import { RESPONSE } from '../../../constants';
import models from '../../../models';

export default (id: string) => new Promise(async (resolve, reject) => {
  try {
    const category = await models.Category.findOne({ where: { id } });

    if (!category) {
      return reject(RESPONSE.error.category.notExists);
    }

    await category.destroy();

    return resolve(category);
  } catch (error) {
    return reject(error);
  }
});
