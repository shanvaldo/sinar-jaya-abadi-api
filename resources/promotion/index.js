const graphqlFileLoader = require('../../utils/graphqlFileLoader');
const resolvers = require('./promotion.resolvers');

module.exports = {
  typeDefs: graphqlFileLoader('promotion/promotion.graphql'),
  resolvers,
};
