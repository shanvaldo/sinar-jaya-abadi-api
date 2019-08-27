const graphqlFileLoader = require('../../utils/graphqlFileLoader');
const resolvers = require('./category.resolvers');

module.exports = {
  typeDefs: graphqlFileLoader('category/category.graphql'),
  resolvers,
};
