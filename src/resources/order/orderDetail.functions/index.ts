import findByIdOrderDetail from './findById.orderDetail';
import findIdsOrderDetail from './findIds.orderDetail';

import dataLoaderConfig from '../../../config/dataLoader.config';

export const orderDetailLoader = Object.freeze({
  findById: dataLoaderConfig('orderDetail', findByIdOrderDetail),
});

export default Object.freeze({
  findById: findByIdOrderDetail,
  findIds: findIdsOrderDetail,
});
