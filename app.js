const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const schema = require('./schema');

const server = new ApolloServer({
  schema,
});

const app = express();

app.get('/health', (_, res) => {
  res.send('health');
});

server.applyMiddleware({ app, path: '/api' });

app.listen({ port: 3000 }, () =>
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
);