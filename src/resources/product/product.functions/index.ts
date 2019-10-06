import DataLoader from 'dataloader';

import createProduct from './create.product';
import deleteProduct from './delete.product';
import findAllProduct from './findAll.product';
import findByIdProduct from './findById.product';
import findBySlugProduct from './findBySlug.product';
import findIdsProduct from './findIds.product';
import incrementSeenProduct from './incrementSeen.product';
import recommendationProduct from './recommendation.product';
import searchProduct from './search.product';
import updateProduct from './update.product';

export const productLoader = Object.freeze({
  findById  : new DataLoader(findByIdProduct),
  findBySlug: new DataLoader(findBySlugProduct),
});

export default Object.freeze({
  create        : createProduct,
  delete        : deleteProduct,
  findAll       : findAllProduct,
  findById      : findByIdProduct,
  findBySlug    : findBySlugProduct,
  findIds       : findIdsProduct,
  incrementSeen : incrementSeenProduct,
  recommendation: recommendationProduct,
  search        : searchProduct,
  update        : updateProduct,
});
