import { IResponseFindIds } from '../../../interfaces/IResponseFindIds';
import models from '../../../models';
import { TSubCategoryInstance } from '../../../models/subCategory';

interface IFilterSubCategory {
  categoryId?: string;
  slug?: string;
}

interface IArgIdSubCategory {
  limit: number;
  offset?: number;
  filterBy?: IFilterSubCategory;
}

export default (args: IArgIdSubCategory): Promise<IResponseFindIds<TSubCategoryInstance>> => new Promise(async (resolve, reject) => {
  try {
    const {
      limit,
      filterBy = {},
      offset = 0,
    } = args;

    const condition = Object.keys(filterBy).length ? { where: filterBy } : {};

    const [rows, totalCount] = await Promise.all([
      models.SubCategory.findAll({
        ...condition,
        attributes: ['id'],
        limit,
        offset,
      }),
      models.SubCategory.count(),
    ]);

    return resolve({ rows, totalCount });
  } catch (error) {
    return reject(error);
  }
});
