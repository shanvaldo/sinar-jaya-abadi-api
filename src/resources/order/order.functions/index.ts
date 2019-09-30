import DataLoader from 'dataloader';

import createOrder from './create.order';
import findAllOrder from './findAll.order';
import findByIdOrder from './findById.order';
import findIdsOrder from './findIds.order';

export const orderLoader = Object.freeze({
  findById: new DataLoader(findByIdOrder),
});

export default Object.freeze({
  create  : createOrder,
  findAll : findAllOrder,
  findById: findByIdOrder,
  findIds : findIdsOrder,
});
