import models from '../../../models';

export default (id: string) => new Promise(async (resolve, reject) => {
  try {
    const customer = await models.Customer.findOne({ where: { id } });

    return resolve(customer);
  } catch (error) {
    return reject(error);
  }
});
