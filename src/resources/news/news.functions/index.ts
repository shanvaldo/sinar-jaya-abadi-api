import createNews from './create.news';
import deleteNews from './delete.news';
import findAllNews from './findAll.news';
import findByIdNews from './findById.news';
import findIdsNews from './findIds.news';
import updateNews from './update.news';

import dataLoaderConfig from '../../../config/dataLoader.config';

export const newsLoader = Object.freeze({
  findById  : dataLoaderConfig('news', findByIdNews),
});

export default Object.freeze({
  create  : createNews,
  delete  : deleteNews,
  findAll : findAllNews,
  findById: findByIdNews,
  findIds : findIdsNews,
  update  : updateNews,
});
