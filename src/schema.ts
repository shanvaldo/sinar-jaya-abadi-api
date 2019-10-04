import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import authResource from './resources/auth';
import baseResource from './resources/base';
import categoryResource from './resources/category';
import customerResource from './resources/customer';
import infoResource from './resources/info';
import newsResource from './resources/news';
import orderResource from './resources/order';
import productResource from './resources/product';
import promotionResource from './resources/promotion';
import subCategoryResource from './resources/subCategory';
import userResource from './resources/user';

export default makeExecutableSchema({
  resolvers: merge(
    authResource.resolvers,
    baseResource.resolvers,
    categoryResource.resolvers,
    customerResource.resolvers,
    infoResource.resolvers,
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
    infoResource.typeDefs,
    newsResource.typeDefs,
    orderResource.typeDefs,
    productResource.typeDefs,
    promotionResource.typeDefs,
    subCategoryResource.typeDefs,
    userResource.typeDefs,
  ],
});
