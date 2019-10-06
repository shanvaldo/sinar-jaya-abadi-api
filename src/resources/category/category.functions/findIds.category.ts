import { IResponseFindIds } from '../../../interfaces/IResponseFindIds';
import models from '../../../models';
import { TCategoryInstance } from '../../../models/category';

interface IFilterCategory {
  slug?: string;
  createdAt?: string | object;
}

interface ISortCategory {
  createdAt?: 'ASC' | 'DESC';
}

interface IArgIdCategory {
  limit: number;
  offset: number;
  filterBy?: IFilterCategory;
  sort?: ISortCategory;
}

export default (args: IArgIdCategory): Promise<IResponseFindIds<TCategoryInstance>> => new Promise(async (resolve, reject) => {
  try {
    const {
      limit,
      filterBy = {},
      offset,
      sort = { createdAt: 'ASC' },
    } = args;

    const condition = Object.keys(filterBy).length ? { where: filterBy } : {};

    const [rows, totalCount] = await Promise.all([
      models.Category.findAll({
        ...condition,
        attributes: ['id', 'slug', 'createdAt'],
        limit,
        offset,
        order: Object.entries(sort),
      }),
      models.Category.count(),
    ]);

    return resolve({ rows, totalCount });
  } catch (error) {
    return reject(error);
  }
});
