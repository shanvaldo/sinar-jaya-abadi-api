import models from '../../../models';

export default (args: string): Promise<Array<string>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await models.Product.findAll({
        attributes: ['id', 'name'],
        where: { name: { [models.sequelize.Op.iLike]: `%${args}%` } },
      });

      return resolve(products.map(({ id }) => id));
    } catch (error) {
      return reject(error);
    }
  });
};
