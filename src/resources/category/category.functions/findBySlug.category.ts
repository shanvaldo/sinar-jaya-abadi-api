import { Buffer } from 'buffer';

import { ICursorConnection } from '../../../interfaces/ICursorConnection';
import models from '../../../models';
import { TCategoryInstance } from '../../../models/category';

export default (slugs: Array<string>): Promise<Array<ICursorConnection<TCategoryInstance>>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const categories = await models.Category.findAll({ where: { slug: { [models.sequelize.Op.in]: slugs } } });

      const response = categories.map((category) => ({
        cursor: Buffer.from(`${category.createdAt.getTime()}`).toString('base64'),
        node  : category,
      }));

      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
};
