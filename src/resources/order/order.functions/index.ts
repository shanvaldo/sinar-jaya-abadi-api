import createOrder from './create.order';
import findAllOrder from './findAll.order';
import findByIdOrder from './findById.order';

export default Object.freeze({
  create: createOrder,
  findAll: findAllOrder,
  findById: findByIdOrder,
});
