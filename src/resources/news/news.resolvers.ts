import news from './news.functions';

import verifyToken from '../auth/auth.functions/verify.auth';

export default {
  Query: {
    news: () => news.findAll(),

    newsDetail: (_1, { inputNewsDetail: { newsId } }) => {
      return news.findById(newsId);
    },
  },

  Mutation: {
    createNews: async (_1, { inputCreateNews: { title, content, coverImage } }, { accessToken }) => {
      await verifyToken(accessToken);

      return news.create({
        content,
        coverImage,
        title,
      });
    },

    updateNews: async (_1, { inputUpdateNews: { newsId, title, content, coverImage } }, { accessToken }) => {
      await verifyToken(accessToken);

      return news.update(newsId, {
        content,
        coverImage,
        title,
      });
    },

    deleteNews: async (_1, { inputDeleteNews: { newsId } }, { accessToken }) => {
      await verifyToken(accessToken);

      return news.delete(newsId);
    },
  },
};
