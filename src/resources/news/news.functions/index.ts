import createNews from './create.news';
import deleteNews from './delete.news';
import findAllNews from './findAll.news';
import findByIdNews from './findById.news';
import updateNews from './update.news';

export default Object.freeze({
  create: createNews,
  delete: deleteNews,
  findAll: findAllNews,
  findById: findByIdNews,
  update: updateNews,
});
