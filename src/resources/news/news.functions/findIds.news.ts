import { IResponseFindIds } from '../../../interfaces/IResponseFindIds';
import models from '../../../models';
import { TNewsInstance } from '../../../models/news';

interface ISortNews {
  createdAt?: string;
}

interface IArgIdNews {
  limit: number;
  offset: number;
  sort: ISortNews;
}

export default (args: IArgIdNews): Promise<IResponseFindIds<TNewsInstance>> => new Promise(async (resolve, reject) => {
  try {
    const { limit, offset, sort: { createdAt = 'DESC' } = { createdAt } } = args;

    const [rows, totalCount] = await Promise.all([
      models.News.findAll({
        attributes: ['id', 'createdAt'],
        limit,
        offset,
        order: [['createdAt', createdAt]],
      }),
      models.News.count(),
    ]);

    return resolve({ rows, totalCount });
  } catch (error) {
    return reject(error);
  }
});
