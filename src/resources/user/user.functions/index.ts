import createUser from './create.user';
import deleteUser from './delete.user';
import findAllUser from './findAll.user';
import findByIdUser from './findById.user';

export default Object.freeze({
  create: createUser,
  delete: deleteUser,
  findAll: findAllUser,
  findById: findByIdUser,
});
