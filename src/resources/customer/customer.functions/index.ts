import DataLoader from 'dataloader';

import createCustomer from './create.customer';
import deleteCustomer from './delete.customer';
import findAllCustomer from './findAll.customer';
import findByIdCustomer from './findById.customer';
import findIdsCustomer from './findIds.customer';

export const customerLoader = Object.freeze({
  findById: new DataLoader(findByIdCustomer),
});

export default Object.freeze({
  create  : createCustomer,
  delete  : deleteCustomer,
  findAll : findAllCustomer,
  findById: findByIdCustomer,
  findIds : findIdsCustomer,
});
