require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const schema = require('./schema');
const constants = require('./constants');

const server = new ApolloServer({
  context: ({ req }) => ({
    accessToken: req.headers['auth-token'],
    apiKey: req.headers['x-api-key'],
  }),
  schema,
});

const app = express();
const env = process.env.NODE_ENV || 'dev';
const api_key = process.env.API_KEY;
const port = process.env.PORT || 3000;
const graphqlPath = '/graphql';

app
  .get('/', (_, res) => res.send('vis-cleaning-api'))
  .use(graphqlPath, (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if ((!apiKey || apiKey !== api_key) && env === 'prod') {
      return res.status(401).send({ message: constants.response.invalidToken });
    }

    return next();
  });

server.applyMiddleware({ app, path: graphqlPath });

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
);