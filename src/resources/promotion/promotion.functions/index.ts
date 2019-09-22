import createPromotion from './create.promotion';
import deletePromotion from './delete.promotion';
import findAllPromotion from './findAll.promotion';
import synchPromotion from './synch.promotion';
import updatePromotion from './update.promotion';

export default Object.freeze({
  create: createPromotion,
  delete: deletePromotion,
  findAll: findAllPromotion,
  synch: synchPromotion,
  update: updatePromotion,
});
