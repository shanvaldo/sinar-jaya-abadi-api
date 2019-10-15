import createCustomer from './create.customer';
import deleteCustomer from './delete.customer';
import findAllCustomer from './findAll.customer';
import findByIdCustomer from './findById.customer';
import findIdsCustomer from './findIds.customer';

import dataLoaderConfig from '../../../config/dataLoader.config';

export const customerLoader = Object.freeze({
  findById: dataLoaderConfig('customer', findByIdCustomer),
});

export default Object.freeze({
  create  : createCustomer,
  delete  : deleteCustomer,
  findAll : findAllCustomer,
  findById: findByIdCustomer,
  findIds : findIdsCustomer,
});
