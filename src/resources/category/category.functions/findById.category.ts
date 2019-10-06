import models from '../../../models';
import { TCategoryInstance } from '../../../models/category';

export default (ids: Array<string>): Promise<Array<TCategoryInstance>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const categories = await models.Category.findAll({ where: { id: { [models.sequelize.Op.in]: ids } } });

      return resolve(categories);
    } catch (error) {
      return reject(error);
    }
  });
};
