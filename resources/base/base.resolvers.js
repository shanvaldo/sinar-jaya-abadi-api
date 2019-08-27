require('dotenv').config();

module.exports = {
  Query: {
    appName: () => `Hasil-Nelayan ${process.env.NODE_ENV}`,
  },

  Mutation: {
    setAppName: () => 'Hasil-Nelayan',
  },
};
