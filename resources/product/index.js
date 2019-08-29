const graphqlFileLoader = require('../../utils/graphqlFileLoader');
const resolvers = require('./product.resolvers');

module.exports = {
  typeDefs: graphqlFileLoader('product/product.graphql'),
  resolvers,
};
