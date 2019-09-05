const graphqlFileLoader = require('../../utils/graphqlFileLoader');
const resolvers = require('./order.resolvers');

module.exports = {
  typeDefs: graphqlFileLoader('order/order.graphql'),
  resolvers,
};
