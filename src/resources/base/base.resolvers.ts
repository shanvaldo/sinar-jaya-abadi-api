import dotenv from 'dotenv';
import { GraphQLScalarType, Kind } from 'graphql';

import { categoryLoader } from '../category/category.functions';
import { customerLoader } from '../customer/customer.functions';

import { IPageInfo } from '../../interfaces/IPageInfo';
import { newsLoader } from '../news/news.functions';
import { orderLoader } from '../order/order.functions';
import { productLoader } from '../product/product.functions';
import { subCategoryLoader } from '../subCategory/subCategory.functions';

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

    clearCache: () => {
      categoryLoader.findById.clearAll();
      categoryLoader.findBySlug.clearAll();
      customerLoader.findById.clearAll();
      newsLoader.findById.clearAll();
      orderLoader.findById.clearAll();
      productLoader.findById.clearAll();
      productLoader.findBySlug.clearAll();
      subCategoryLoader.findById.clearAll();
      subCategoryLoader.findBySlug.clearAll();

      return true;
    },
  },
};
