import models from '../../../models';
import { TCustomerInstance } from '../../../models/customer';

export default (): Promise<Array<TCustomerInstance>> => new Promise(async (resolve, reject) => {
  try {
    const customers = await models.Customer.findAll();

    return resolve(customers);
  } catch (error) {
    return reject(error);
  }
});
