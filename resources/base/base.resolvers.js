require('dotenv').config();

module.exports = {
  Query: {
    appName: () => `VIS-Cleaning-Api ${process.env.NODE_ENV}`,
  },

  Mutation: {
    setAppName: () => 'VIS-Cleaning-Api',
  },
};
