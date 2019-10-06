import newsFunctions, { newsLoader } from './news.functions';

import { IConnection } from '../../interfaces/IConnection';
import { TNewsInstance } from '../../models/news';
import pageBuilder from '../../utils/pageBuilder';
import verifyToken from '../auth/auth.functions/verify.auth';

export default {
  News: {
    content         : (news: TNewsInstance) => news.content,
    coverImage      : (news: TNewsInstance) => news.coverImage,
    createdAt       : (news: TNewsInstance) => news.createdAt,
    id              : (news: TNewsInstance) => news.id,
    title           : (news: TNewsInstance) => news.title,
    updatedAt       : (news: TNewsInstance) => news.updatedAt,

    nextNewsId      : (news: TNewsInstance) => news.nextNewsId,
    previousNewsId  : (news: TNewsInstance) => news.previousNewsId,

    nextNews        : (news: TNewsInstance) => {
      if (!news.nextNewsId) {
        return null;
      }

      return newsLoader.findById.load(news.nextNewsId);
    },
    previousNews    : (news: TNewsInstance) => {
      if (!news.previousNewsId) {
        return null;
      }

      return newsLoader.findById.load(news.previousNewsId);
    },
  },

  Query: {
    news: async (_1, { inputNews: { first: limit = 10, offset = 0, sortBy = {} } = {} }) => {
      const { rows: messages, totalCount } = await newsFunctions.findIds({ limit, offset, sort: sortBy });

      const news = await newsLoader.findById.loadMany(messages.map(({ id }) => id));
      const pageInfo = pageBuilder(limit, offset, totalCount);

      const response: IConnection<TNewsInstance> = {
        edges: news,
        pageInfo,
        totalCount,
      };

      return response;
    },

    newsDetail: (_1, { inputNewsDetail: { newsId } }) => {
      return newsLoader.findById.load(newsId);
    },
  },

  Mutation: {
    createNews: async (_1, { inputCreateNews: { title, content, coverImage } }, { accessToken }) => {
      await verifyToken(accessToken);

      return newsFunctions.create({
        content,
        coverImage,
        title,
      });
    },

    updateNews: async (_1, { inputUpdateNews: { newsId, title, content, coverImage } }, { accessToken }) => {
      await verifyToken(accessToken);

      newsLoader.findById.clear(newsId);

      return newsFunctions.update(newsId, {
        content,
        coverImage,
        title,
      });
    },

    deleteNews: async (_1, { inputDeleteNews: { newsId } }, { accessToken }) => {
      await verifyToken(accessToken);

      newsLoader.findById.clear(newsId);

      return newsFunctions.delete(newsId);
    },
  },
};
