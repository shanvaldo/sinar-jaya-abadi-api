import { RESPONSE } from '../../../constants';
import models from '../../../models';

interface IInputUpdateNews {
  title?: string;
  content?: string;
  coverImage?: string;
}

export default (id: string, { title, content, coverImage }) => new Promise(async (resolve, reject) => {
  try {
    const news = await models.News.findOne({ where: { id } });

    if (!news) {
      return reject(RESPONSE.error.news.notExists);
    }

    const updatedNews = await news.update({
      content,
      coverImage,
      title,
    }, { returning: true });

    return resolve(updatedNews);
  } catch (error) {
    return reject(error);
  }
});
