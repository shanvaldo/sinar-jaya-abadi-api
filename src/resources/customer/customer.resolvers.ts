import customerFunctions from './customer.functions';

import { TCustomerInstance } from '../../models/customer';
import verifyToken from '../auth/auth.functions/verify.auth';

export default {
  Customer: {
    address   : (customer: TCustomerInstance) => customer.address,
    createdAt : (customer: TCustomerInstance) => customer.createdAt,
    email     : (customer: TCustomerInstance) => customer.email,
    fullName  : (customer: TCustomerInstance) => customer.fullName,
    id        : (customer: TCustomerInstance) => customer.id,
    phone     : (customer: TCustomerInstance) => customer.phone,
    updatedAt : (customer: TCustomerInstance) => customer.updatedAt,
  },

  Query: {
    customers: async (_1, _2, { accessToken }) => {
      // await verifyToken(accessToken);

      return customerFunctions.findAll();
    },

    customer: async (_1, { customerId }, { accessToken }) => {
      await verifyToken(accessToken);

      return customerFunctions.findById(customerId);
    },
  },

  Mutation: {
    createCustomer: (_1, { input: { email, fullName, phone, address } }) => customerFunctions.create({
      address,
      email,
      fullName,
      phone,
    }),

    deleteCustomer: async (_1, { customerId }, { accessToken }) => {
      await verifyToken(accessToken);

      return customerFunctions.delete(customerId);
    },
  },
};
