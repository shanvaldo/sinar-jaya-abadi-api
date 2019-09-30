import { AnyWhereOptions } from 'sequelize';

import { IResponseFindIds } from '../../../interfaces/IResponseFindIds';
import models from '../../../models';
import { TProductInstance } from '../../../models/product';

interface IFilterProduct {
  categoryId?: string;
  subCategoryId?: string | object;
}

interface ISortProduct {
  name?: 'ASC' | 'DESC';
  seen?: 'ASC' | 'DESC';
  createdAt?: 'ASC' | 'DESC';
}

interface IArgIdProduct {
  limit?: number;
  offset?: number;
  filterBy?: IFilterProduct;
  sortBy?: ISortProduct;
}

export default (args?: IArgIdProduct): Promise<IResponseFindIds<TProductInstance>> => new Promise(async (resolve, reject) => {
  try {
    const { limit = 10, offset = 0, filterBy = {}, sortBy = {} } = args;

    const condition = Object.keys(filterBy).length ? { where: filterBy } : {};

    const [rows, totalCount] = await Promise.all([
      models.Product.findAll({
        ...condition,
        attributes: ['id', 'name', 'seen', 'createdAt'],
        limit,
        offset,
        order: Object.entries(sortBy),
      }),
      models.Product.count((<AnyWhereOptions> condition)),
    ]);

    return resolve({ rows, totalCount });
  } catch (error) {
    return reject(error);
  }
});
