const graphqlFileLoader = require('../../utils/graphqlFileLoader');
const resolvers = require('./auth.resolvers');

module.exports = {
  typeDefs: graphqlFileLoader('auth/auth.graphql'),
  resolvers,
};
