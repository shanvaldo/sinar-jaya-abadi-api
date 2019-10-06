import models from '../../../models';
import slugBuilder from '../../../utils/slugBuilder';

interface IInputCreateNews {
  title: string;
  content?: string;
  coverImage: string;
}

export default ({ title, content, coverImage }) => new Promise(async (resolve, reject) => {
  try {
    const news = await models.News.create({
      content,
      coverImage,
      slug: slugBuilder(title),
      title,
    });

    return resolve(news);
  } catch (error) {
    return reject(error.message || error);
  }
});
