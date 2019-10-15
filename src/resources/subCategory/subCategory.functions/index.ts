import createSubCategory from './create.subCategory';
import deleteSubCategory from './delete.subCategory';
import findAllSubCategory from './findAll.subCategory';
import findByIdSubCategory from './findById.subCategory';
import findBySlugSubCategory from './findBySlug.subCategory';
import findIdsSubCategory from './findIds.subCategory';
import updateSubCategory from './update.subCategory';

import dataLoaderConfig from '../../../config/dataLoader.config';

export const subCategoryLoader = Object.freeze({
  findById  : dataLoaderConfig('subCategory', findByIdSubCategory),
  findBySlug: dataLoaderConfig('subCategory', findBySlugSubCategory),
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
