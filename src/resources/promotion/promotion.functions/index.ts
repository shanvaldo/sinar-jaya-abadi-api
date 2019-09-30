import createPromotion from './create.promotion';
import deletePromotion from './delete.promotion';
import findProductIdsPromotion from './findProductIds.promotion';
import synchPromotion from './synch.promotion';
import updatePromotion from './update.promotion';

export default Object.freeze({
  create        : createPromotion,
  delete        : deletePromotion,
  findProductIds: findProductIdsPromotion,
  synch         : synchPromotion,
  update        : updatePromotion,
});
