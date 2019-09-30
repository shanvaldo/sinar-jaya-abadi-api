import models from '../../../models';

export default (): Promise<Array<string>> => new Promise(async (resolve, reject) => {
  try {
    const promotions = await models.Promotion.findAll({
      attributes: ['productId'],
      order: [['order', 'ASC']],
    });

    return resolve(promotions.map((p) => p.productId));
  } catch (error) {
    return reject(error);
  }
});
