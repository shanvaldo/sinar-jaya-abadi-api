import auth from './auth.functions';

export default {
  Mutation: {
    login: (_1, { inputLogin: { username, password } }) => auth.login({
      password,
      username,
    }),

    refreshToken: (_1, { username, refreshToken }) => auth.refresh({
      refreshToken,
      username,
    }),
  },
};
