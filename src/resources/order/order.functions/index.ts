import createOrder from './create.order';
import findAllOrder from './findAll.order';
import findByIdOrder from './findById.order';
import findIdsOrder from './findIds.order';

import dataLoaderConfig from '../../../config/dataLoader.config';

export const orderLoader = Object.freeze({
  findById: dataLoaderConfig('order', findByIdOrder),
});

export default Object.freeze({
  create  : createOrder,
  findAll : findAllOrder,
  findById: findByIdOrder,
  findIds : findIdsOrder,
});
