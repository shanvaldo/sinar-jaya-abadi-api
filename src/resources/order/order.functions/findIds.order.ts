import { AnyWhereOptions } from 'sequelize';
import { IResponseFindIds } from '../../../interfaces/IResponseFindIds';
import models from '../../../models';
import { TOrderInstance } from '../../../models/order';

interface IFilterOrder {
  customerId?: string;
}

interface IArgIdOrder {
  limit?: number;
  offset?: number;
}

export default (arg?: IArgIdOrder, filterBy: IFilterOrder = {}): Promise<IResponseFindIds<TOrderInstance>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit, offset } = arg;

      const condition = Object.keys(filterBy).length ? { where: filterBy } : {};

      const [rows, totalCount] = await Promise.all([
        models.Order.findAll({
          ...condition,
          attributes: ['id', 'createdAt'],
          limit,
          offset,
          order: [['createdAt', 'DESC']],
        }),
        models.Order.count((<AnyWhereOptions> condition)),
      ]);

      return resolve({ rows, totalCount });
    } catch (error) {
      return reject(error);
    }
  });
};
