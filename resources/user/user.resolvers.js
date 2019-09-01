const user = require('./user.functions');
const verifyToken = require('../auth/auth.functions/verify.auth');

module.exports = {
  Query: {
    users: async (_1, _2, { accessToken }) => {
      await verifyToken(accessToken);

      return user.findAll();
    },
    user: async (_1, { userId }, { accessToken }) => {
      await verifyToken(accessToken);

      return user.findById(userId);
    },
  },

  Mutation: {
    createUser: async (_1, { username, password }, { accessToken }) => {
      // await verifyToken(accessToken);

      return user.create({ username, password });
    },

    deleteUser: async (_1, { userId }, { accessToken }) => {
      await verifyToken(accessToken);

      return user.delete(userId);
    },
  },
};
