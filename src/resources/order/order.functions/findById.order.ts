import models from '../../../models';
import { TOrderInstance } from '../../../models/order';

export default (ids: Array<string>): Promise<Array<TOrderInstance>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const orders = await models.Order.findAll({
        order: [['createdAt', 'DESC']],
        where: { id: { [models.sequelize.Op.in]: ids } },
      });

      return resolve(orders);
    } catch (error) {
      return reject(error);
    }
  });
};
