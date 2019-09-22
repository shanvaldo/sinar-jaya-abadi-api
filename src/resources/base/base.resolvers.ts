import dotenv from 'dotenv';

dotenv.config();

export default {
  Query: {
    appName: () => `VIS-Cleaning-Api ${process.env.NODE_ENV}`,
  },

  Mutation: {
    setAppName: () => 'VIS-Cleaning-Api',
  },
};
