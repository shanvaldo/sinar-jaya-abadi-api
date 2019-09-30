import models from '../../../models';
import { TCustomerInstance } from '../../../models/customer';

interface IInputCustomerCategory {
  email: string;
  fullName: string;
  phone?: string;
  address?: string;
}

export default ({ email, fullName, phone, address }: IInputCustomerCategory): Promise<TCustomerInstance> => {
  return new Promise(async (resolve, reject) => {
    try {
      const [customer] = await models.Customer.findOrCreate({
        defaults: {
          address,
          email,
          fullName,
          phone,
        },
        where: { email },
      });

      return resolve(customer);
    } catch (error) {
      return reject(error.message || error);
    }
  });
};
