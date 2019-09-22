import models from '../../../models';
import { TCategoryInstance } from '../../../models/category';

export default (ids: Array<string>): Promise<Array<TCategoryInstance>> => new Promise(async (resolve, reject) => {
  try {
    const category = await models.Category.findAll({ where: { id: { [models.sequelize.Op.in]: ids } } });

    return resolve(category);
  } catch (error) {
    return reject(error);
  }
});
