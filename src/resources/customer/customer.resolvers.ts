import customerFunctions, { customerLoader } from './customer.functions';

import { IConnection } from '../../interfaces/IConnection';
import { TCustomerInstance } from '../../models/customer';
import pageBuilder from '../../utils/pageBuilder';
import verifyToken from '../auth/auth.functions/verify.auth';
import orderFunctions, { orderLoader } from '../order/order.functions';

export default {
  Customer: {
    createdAt : (customer: TCustomerInstance) => customer.createdAt,
    email     : (customer: TCustomerInstance) => customer.email,
    fullName  : (customer: TCustomerInstance) => customer.fullName,
    id        : (customer: TCustomerInstance) => customer.id,
    phone     : (customer: TCustomerInstance) => customer.phone,
    updatedAt : (customer: TCustomerInstance) => customer.updatedAt,

    orders    : async (customer: TCustomerInstance, { limit }) => {
      const { rows } = await orderFunctions.findIds({ limit }, {
        customerId: customer.id,
      });

      return orderLoader.findById.loadMany(rows.map((r) => r.id));
    },
  },

  Query: {
    customers: async (_1, { first: limit = 10, offset = 0 }, { accessToken }) => {
      // await verifyToken(accessToken);

      const { rows: messages, totalCount } = await customerFunctions.findIds({ limit, offset });
      const edges = await customerLoader.findById.loadMany(messages.map(({ id }) => id));

      const pageInfo = pageBuilder(limit, offset, totalCount);

      const response: IConnection<TCustomerInstance> = {
        edges,
        pageInfo,
        totalCount,
      };

      return response;
    },

    customer: async (_1, { inputCustomer: { customerId } }, { accessToken }) => {
      await verifyToken(accessToken);

      return customerLoader.findById.load(customerId);
    },
  },

  Mutation: {
    createCustomer: (_1, { inputCreateCustomer: { email, fullName, phone } }) => customerFunctions.create({
      email,
      fullName,
      phone,
    }),

    deleteCustomer: async (_1, { customerId }, { accessToken }) => {
      await verifyToken(accessToken);

      const deletedCustomer = await customerFunctions.delete(customerId);

      await customerLoader.findById.clear(customerId);

      return deletedCustomer;
    },
  },
};
