import order from './order.functions';

export default {
  Query: {
    orders: () => order.findAll(),

    order: (_1, { orderId }) => order.findById(orderId),
  },

  Mutation: {
    createOrder: (_1, { inputCreateOrder }) => {
      const { customerId, totalPrice, orderDetails } = inputCreateOrder;

      return order.create({ customerId, totalPrice, orderDetails });
    },
  },
};
