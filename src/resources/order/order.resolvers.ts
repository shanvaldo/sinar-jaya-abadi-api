import orderFunctions, { orderLoader } from './order.functions';
import orderDetailFunctions, { orderDetailLoader } from './orderDetail.functions';

import { IConnection } from '../../interfaces/IConnection';
import { TOrderInstance } from '../../models/order';
import { TOrderDetailInstance } from '../../models/orderDetail';
import pageBuilder from '../../utils/pageBuilder';
import customerFunctions, { customerLoader } from '../customer/customer.functions';
import productFunctions, { productLoader } from '../product/product.functions';

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

    product     : async (orderDetail: TOrderDetailInstance) => {
      // const [response] = await productFunctions.findById([orderDetail.productId]);

      // return response;

      return productLoader.findById.load(orderDetail.productId);
    },
  },

  Order: {
    createdAt   : (order: TOrderInstance) => order.createdAt,
    customerId  : (order: TOrderInstance) => order.customerId,
    id          : (order: TOrderInstance) => order.id,
    totalPrice  : (order: TOrderInstance) => order.totalPrice,
    updatedAt   : (order: TOrderInstance) => order.updatedAt,

    customer    : async (order: TOrderInstance) => {
      // const [response] = await customerFunctions.findById([order.customerId]);

      // return response;

      return customerLoader.findById.load(order.customerId);
    },

    orderDetails: async (order: TOrderInstance, { limit }) => {
      const orderDetailIds = await orderDetailFunctions.findIds(limit, { orderId: order.id });

      if (!orderDetailIds.length) {
        return [];
      }

      return orderDetailLoader.findById.loadMany(orderDetailIds);

      // const response = await Promise.all(orderDetailIds.map((o) => orderDetailFunctions.findById([o])));

      // return response.flatMap((r) => r);
    },
  },

  Query: {
    orders: async (_1: any, { inputOrders: { first: limit = 10, offset = 0 } = {} }) => {
      const { rows: messages, totalCount } = await orderFunctions.findIds({ limit, offset });

      // const edges = await Promise.all(messages.map(({ id }) => orderFunctions.findById([id])));
      const edges = await orderLoader.findById.loadMany(messages.map(({ id }) => id));
      const pageInfo = pageBuilder(limit, offset, totalCount);

      const response: IConnection<TOrderInstance> = {
        edges: edges.flatMap((e) => e),
        pageInfo,
        totalCount,
      };

      return response;
    },

    order: async (_1: any, { inputOrder: { orderId } }) => {
      // const [response] = await orderFunctions.findById([orderId]);

      // return response;

      return orderLoader.findById.load(orderId);
    },
  },

  Mutation: {
    createOrder: (_1: any, { inputCreateOrder }) => {
      const { customerId, code, totalPrice, orderDetails } = inputCreateOrder;

      return orderFunctions.create({ customerId, code, totalPrice, orderDetails });
    },
  },
};
