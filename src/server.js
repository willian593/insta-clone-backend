require('dotenv').config();
import express from 'express';
import logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import { getUser } from './helpers/user.utils';
import { typeDefs, resolvers } from './schema';
import { graphqlUploadExpress } from 'graphql-upload';

const PORT = process.env.PORT;

async function startServer() {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    },
  });

  await server.start();

  const app = express();
  app.use(logger('tiny'));
  app.use('/static', express.static('uploads'));

  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  await new Promise((r) => app.listen({ port: PORT }, r));

  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql ✅`);
}

startServer();
