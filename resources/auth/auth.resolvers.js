const auth = require('./auth.functions');

module.exports = {
  Mutation: {
    login: (_1, { username, password }) => auth.login({
      username,
      password,
    }),

    refreshToken: (_1, { username, refreshToken }) => auth.refresh({
      username,
      refreshToken,
    }),
  },
};
