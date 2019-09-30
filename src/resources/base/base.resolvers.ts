import dotenv from 'dotenv';
import { GraphQLScalarType, Kind } from 'graphql';
import { IPageInfo } from '../../interfaces/IPageInfo';

dotenv.config();

export default {
  Date: new GraphQLScalarType({
    description : 'Date custom scalar type',
    name        : 'Date',
    parseLiteral: (ast) => {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }

      return null;
    },
    parseValue  : (value) => new Date(value),
    serialize   : (value) => value.getTime(),
  }),

  PageInfo: {
    currentPage     : (pageInfo: IPageInfo) => pageInfo.currentPage,
    hasNextPage     : (pageInfo: IPageInfo) => pageInfo.hasNextPage,
    hasPreviousPage : (pageInfo: IPageInfo) => pageInfo.hasPreviousPage,
    totalPage       : (pageInfo: IPageInfo) => pageInfo.totalPage,
  },

  Query: {
    appName: () => `VIS-Cleaning-Api ${process.env.NODE_ENV}`,
  },

  Mutation: {
    setAppName: () => 'VIS-Cleaning-Api',
  },
};
