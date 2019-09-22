import createCustomer from './create.customer';
import deleteCustomer from './delete.customer';
import findAllCustomer from './findAll.customer';
import findByIdCustomer from './findById.customer';

export default Object.freeze({
  create: createCustomer,
  delete: deleteCustomer,
  findAll: findAllCustomer,
  findById: findByIdCustomer,
});
