import models from '../../../models';

export default () => new Promise(async (resolve, reject) => {
  try {
    const orders = await models.Order.findAll();

    return resolve(orders);
  } catch (error) {
    return reject(error);
  }
});
