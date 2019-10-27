import models from '../../../models';
import { TCustomerInstance } from '../../../models/customer';

interface IInputCustomerCategory {
  email?: string;
  fullName: string;
  phone: string;
}

export default ({ email, fullName, phone }: IInputCustomerCategory): Promise<TCustomerInstance> => {
  return new Promise(async (resolve, reject) => {
    try {
      const [customer, flag] = await models.Customer.findOrCreate({
        defaults: {
          email,
          fullName,
          phone,
        },
        where: { phone },
      });

      if (!flag) {
        customer.email = email;
        customer.fullName = fullName;

        await customer.save();
      }

      return resolve(customer);
    } catch (error) {
      return reject(error.message || error);
    }
  });
};
