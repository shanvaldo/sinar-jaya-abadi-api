const graphqlFileLoader = require('../../utils/graphqlFileLoader');
const resolvers = require('./base.resolvers');

module.exports = {
  typeDefs: graphqlFileLoader('base/base.graphql'),
  resolvers,
};
