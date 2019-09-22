import models from '../../../models';

interface IFilterProduct {
  categoryId?: string;
  subCategoryId?: string | object;
}

export default (limit?: number, filterBy?: IFilterProduct): Promise<Array<string>> => new Promise(async (resolve, reject) => {
  try {
    const condition = Object.keys(filterBy).length ? { where: filterBy } : {};

    const products = await models.Product.findAll({
      ...condition,
      attributes: ['id'],
      limit,
    });

    return resolve(products.map((product) => product.id));
  } catch (error) {
    return reject(error);
  }
});
