import createCategory from './create.category';
import deleteCategory from './delete.category';
import findAllCategory from './findAll.category';
import findByIdCategory from './findById.category';
import findBySlugCategory from './findBySlug.category';
import findIdsCategory from './findIds.category';
import updateCategory from './update.category';

import dataLoader from '../../../utils/dataLoader';

export const categoryLoader = Object.freeze({
  findById  : dataLoader(findByIdCategory),
  findBySlug: dataLoader(findBySlugCategory),
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
