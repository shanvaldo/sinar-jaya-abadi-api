import DataLoader from 'dataloader';

import createSubCategory from './create.subCategory';
import deleteSubCategory from './delete.subCategory';
import findAllSubCategory from './findAll.subCategory';
import findByIdSubCategory from './findById.subCategory';
import findBySlugSubCategory from './findBySlug.subCategory';
import findIdsSubCategory from './findIds.subCategory';
import updateSubCategory from './update.subCategory';

export const subCategoryLoader = Object.freeze({
  findById  : new DataLoader(findByIdSubCategory),
  findBySlug: new DataLoader(findBySlugSubCategory),
});

export default Object.freeze({
  create    : createSubCategory,
  delete    : deleteSubCategory,
  findAll   : findAllSubCategory,
  findById  : findByIdSubCategory,
  findBySlug: findBySlugSubCategory,
  findIds   : findIdsSubCategory,
  update    : updateSubCategory,
});
