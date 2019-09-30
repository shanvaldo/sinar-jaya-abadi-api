import { IResponseFindIds } from '../../../interfaces/IResponseFindIds';
import models from '../../../models';
import { TCustomerInstance } from '../../../models/customer';

interface IArgIdCustomer {
  limit: number;
  offset: number;
}

export default (args: IArgIdCustomer): Promise<IResponseFindIds<TCustomerInstance>> => new Promise(async (resolve, reject) => {
  try {
    const { limit, offset } = args;

    const [rows, totalCount] = await Promise.all([
      models.Customer.findAll({
        attributes: ['id', 'fullName'],
        limit,
        offset,
        order: [['fullName', 'ASC']],
      }),
      models.Customer.count(),
    ]);

    return resolve({ rows, totalCount });
  } catch (error) {
    return reject(error);
  }
});
