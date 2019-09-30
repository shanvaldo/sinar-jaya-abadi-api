import { RESPONSE } from '../../../constants';
import models from '../../../models';
import { TCustomerInstance } from '../../../models/customer';

export default (id: string): Promise<TCustomerInstance> => new Promise(async (resolve, reject) => {
  try {
    const customer = await models.Customer.findOne({ where: { id } });

    if (!customer) {
      return reject(RESPONSE.error.customer.notExists);
    }

    await customer.destroy();

    return resolve(customer);
  } catch (error) {
    return reject(error);
  }
});
