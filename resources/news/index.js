const graphqlFileLoader = require('../../utils/graphqlFileLoader');
const resolvers = require('./news.resolvers');

module.exports = {
  typeDefs: graphqlFileLoader('news/news.graphql'),
  resolvers,
};
