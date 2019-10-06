import { RESPONSE } from '../../../constants';
import models from '../../../models';

export default (id: string) => new Promise(async (resolve, reject) => {
  try {
    const subCategory = await models.SubCategory.findOne({ where: { id } });

    if (!subCategory) {
      return reject(RESPONSE.error.subCategory.notExists);
    }

    await subCategory.destroy();

    return resolve(subCategory);
  } catch (error) {
    return reject(error);
  }
});
