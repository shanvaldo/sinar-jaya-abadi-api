const customer = require('./customer.functions');
const verifyToken = require('../auth/auth.functions/verify.auth');

module.exports = {
  Query: {
    customers: async (_1, _2, { accessToken }) => {
      await verifyToken(accessToken);

      return customer.findAll();
    },
    customer: async (_1, { customerId }, { accessToken }) => {
      await verifyToken(accessToken);

      return customer.findById(customerId);
    },
  },

  Mutation: {
    createCustomer: (_1, { email, phone, address }) => customer.create({
      email,
      phone,
      address,
    }),

    deleteCustomer: async (_1, { customerId }, { accessToken }) => {
      await verifyToken(accessToken);

      return customer.delete(customerId);
    },
  },
};
