import { ICursorConnection } from '../../../interfaces/ICursorConnection';
import models from '../../../models';
import { TCustomerInstance } from '../../../models/customer';

export default (ids: Array<string>): Promise<Array<TCustomerInstance>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const customers = await models.Customer.findAll({
        where: { id: { [models.sequelize.Op.in]: ids } },
      });

      return resolve(customers);
    } catch (error) {
      return reject(error);
    }
  });
};
