import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();

import { RESPONSE } from './constants';
import schema from './schema';

const server = new ApolloServer({
  context: ({ req }) => ({
    accessToken: req.headers['auth-token'],
    apiKey: req.headers['x-api-key'],
  }),
  schema,
});

const app = express();
const env = process.env.NODE_ENV || 'dev';
const apiKey = process.env.API_KEY;
const port = process.env.PORT || 3000;
const graphqlPath = '/graphql';

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app
  .get('/', (_, res) => res.send('vis-cleaning-api'))
  .use(graphqlPath, (req, res, next) => {
    const xApiKey = req.headers['x-api-key'];

    // if ((!xApiKey || xApiKey !== apiKey) && env === 'prod') {
    //   return res.status(401).send({ message: RESPONSE.invalidToken });
    // }

    return next();
  });

server.applyMiddleware({ app, path: graphqlPath });

app.listen({ port }, () =>
  // tslint:disable-next-line: no-console
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);
