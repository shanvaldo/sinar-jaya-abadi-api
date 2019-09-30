import orderFunctions, { orderLoader } from './order.functions';
import orderDetailFunctions, { orderDetailLoader } from './orderDetail.functions';

import { IConnection } from '../../interfaces/IConnection';
import { TOrderInstance } from '../../models/order';
import { TOrderDetailInstance } from '../../models/orderDetail';
import pageBuilder from '../../utils/pageBuilder';
import { customerLoader } from '../customer/customer.functions';
import { productLoader } from '../product/product.functions';

export default {
  OrderDetail: {
    createdAt: (orderDetail: TOrderDetailInstance) => orderDetail.createdAt,
    id          : (orderDetail: TOrderDetailInstance) => orderDetail.id,
    note        : (orderDetail: TOrderDetailInstance) => orderDetail.note,
    orderId     : (orderDetail: TOrderDetailInstance) => orderDetail.orderId,
    productId   : (orderDetail: TOrderDetailInstance) => orderDetail.productId,
    quantity    : (orderDetail: TOrderDetailInstance) => orderDetail.quantity,
    totalPrice  : (orderDetail: TOrderDetailInstance) => orderDetail.totalPrice,
    updatedAt   : (orderDetail: TOrderDetailInstance) => orderDetail.updatedAt,

    product     : (orderDetail: TOrderDetailInstance) => productLoader.findById.load(orderDetail.productId),
  },

  Order: {
    createdAt   : (order: TOrderInstance) => order.createdAt,
    customerId  : (order: TOrderInstance) => order.customerId,
    id          : (order: TOrderInstance) => order.id,
    totalPrice  : (order: TOrderInstance) => order.totalPrice,
    updatedAt   : (order: TOrderInstance) => order.updatedAt,

    // customer    : async (order: TOrderInstance) => {
    //   return (await customerLoader.findById.load(order.customerId)).node;
    // },
    // orderDetails: async (order: TOrderInstance, { limit }) => {
    //   const orderDetailIds = await orderDetailFunctions.findIds(limit, { orderId: order.id });

    //   return orderDetailLoader.findById.loadMany(orderDetailIds);
    // },
  },

  Query: {
    orders: async (_1, { inputOrders: { first: limit = 10, offset = 0 } = {} }) => {
      const { rows: messages, totalCount } = await orderFunctions.findIds({ limit, offset });

      const edges = await orderLoader.findById.loadMany(messages.map(({ id }) => id));
      const pageInfo = pageBuilder(limit, offset, totalCount);

      const response: IConnection<TOrderInstance> = {
        edges,
        pageInfo,
        totalCount,
      };

      return response;
    },

    order: (_1, { orderId }) => orderLoader.findById.load(orderId),
  },

  Mutation: {
    createOrder: (_1, { inputCreateOrder }) => {
      const { customerId, code, totalPrice, orderDetails } = inputCreateOrder;

      return orderFunctions.create({ customerId, code, totalPrice, orderDetails });
    },
  },
};
