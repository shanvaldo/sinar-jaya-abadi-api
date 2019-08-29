const graphqlFileLoader = require('../../utils/graphqlFileLoader');
const resolvers = require('./subCategory.resolvers');

module.exports = {
  typeDefs: graphqlFileLoader('subCategory/subCategory.graphql'),
  resolvers,
};
