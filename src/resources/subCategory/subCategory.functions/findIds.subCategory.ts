import models from '../../../models';

interface IFilterSubCategory {
  categoryId?: string;
}

export default (limit?: number, filterBy?: IFilterSubCategory): Promise<Array<string>> => new Promise(async (resolve, reject) => {
  try {
    const condition = Object.keys(filterBy).length ? { where: filterBy } : {};

    const subCategories = await models.SubCategory.findAll({
      ...condition,
      attributes: ['id'],
      limit,
    });

    return resolve(subCategories.map((subCategory) => subCategory.id));
  } catch (error) {
    return reject(error);
  }
});
