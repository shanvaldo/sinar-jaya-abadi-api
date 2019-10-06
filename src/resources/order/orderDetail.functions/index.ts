import DataLoader from 'dataloader';

import findByIdOrderDetail from './findById.orderDetail';
import findIdsOrderDetail from './findIds.orderDetail';

export const orderDetailLoader = Object.freeze({
  findById: new DataLoader(findByIdOrderDetail),
});

export default Object.freeze({
  findById: findByIdOrderDetail,
  findIds: findIdsOrderDetail,
});
