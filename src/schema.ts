import { GraphQLScalarType, Kind } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

export const customScalarType = {
  Date: new GraphQLScalarType({
    description: 'Date custom scalar type',
    name: 'Date',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
};

import authResource from './resources/auth';
import baseResource from './resources/base';
import categoryResource from './resources/category';
import customerResource from './resources/customer';
import newsResource from './resources/news';
import orderResource from './resources/order';
import productResource from './resources/product';
import promotionResource from './resources/promotion';
import subCategoryResource from './resources/subCategory';
import userResource from './resources/user';

export default makeExecutableSchema({
  resolvers: merge(
    customScalarType,
    authResource.resolvers,
    baseResource.resolvers,
    categoryResource.resolvers,
    customerResource.resolvers,
    newsResource.resolvers,
    orderResource.resolvers,
    productResource.resolvers,
    promotionResource.resolvers,
    subCategoryResource.resolvers,
    userResource.resolvers,
  ),
  typeDefs: [
    authResource.typeDefs,
    baseResource.typeDefs,
    categoryResource.typeDefs,
    customerResource.typeDefs,
    newsResource.typeDefs,
    orderResource.typeDefs,
    productResource.typeDefs,
    promotionResource.typeDefs,
    subCategoryResource.typeDefs,
    userResource.typeDefs,
  ],
});
