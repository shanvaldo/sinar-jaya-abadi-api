import DataLoader from 'dataloader';

import createCategory from './create.category';
import deleteCategory from './delete.category';
import findAllCategory from './findAll.category';
import findByIdCategory from './findById.category';
import findBySlugCategory from './findBySlug.category';
import findIdsCategory from './findIds.category';
import updateCategory from './update.category';

export const categoryLoader = Object.freeze({
  findById  : new DataLoader(findByIdCategory),
  findBySlug: new DataLoader(findBySlugCategory),
});

export default Object.freeze({
  create    : createCategory,
  delete    : deleteCategory,
  findAll   : findAllCategory,
  findById  : findByIdCategory,
  findBySlug: findBySlugCategory,
  findIds   : findIdsCategory,
  update    : updateCategory,
});