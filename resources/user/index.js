const graphqlFileLoader = require('../../utils/graphqlFileLoader');
const resolvers = require('./user.resolvers');

module.exports = {
  typeDefs: graphqlFileLoader('user/user.graphql'),
  resolvers,
};
