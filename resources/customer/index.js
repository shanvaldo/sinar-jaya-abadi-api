const graphqlFileLoader = require('../../utils/graphqlFileLoader');
const resolvers = require('./customer.resolvers');

module.exports = {
  typeDefs: graphqlFileLoader('customer/customer.graphql'),
  resolvers,
};
