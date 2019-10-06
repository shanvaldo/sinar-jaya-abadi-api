import models from '../../../models';
import { TCategoryInstance } from '../../../models/category';

export default (): Promise<Array<TCategoryInstance>> => new Promise(async (resolve, reject) => {
  try {
    const categories = await models.Category.findAll();

    return resolve(categories);
  } catch (error) {
    return reject(error);
  }
});
