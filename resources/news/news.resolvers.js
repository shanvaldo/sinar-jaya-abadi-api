const news = require('./news.functions');
const verifyToken = require('../auth/auth.functions/verify.auth');

module.exports = {
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
        title,
        content,
        coverImage,
      });
    },

    updateNews: async (_1, { inputUpdateNews: { newsId, title, content, coverImage } }, { accessToken }) => {
      await verifyToken(accessToken);

      return news.update(newsId, {
        title,
        content,
        coverImage,
      });
    },

    deleteNews: async (_1, { inputDeleteNews: { newsId } }, { accessToken }) => {
      await verifyToken(accessToken);

      return news.delete(newsId);
    },
  },
};
