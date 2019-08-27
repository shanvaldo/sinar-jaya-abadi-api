const customer = require('./customer.functions');

module.exports = {
  Query: {
    customers: () => customer.findAll(),
    customer: (_1, args) => customer.findById(args.customerId),
  },

  Mutation: {
    createCustomer: (_1, args) => customer.create({
      email: args.input.email,
      phone: args.input.phone,
      address: args.input.address,
    }),

    deleteCustomer: (_1, args) => customer.delete(args.customerId),
  },
};
