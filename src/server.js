require('dotenv').config();
import express from 'express';
import { ApolloServer } from 'apollo-server';
import { getUser } from './helpers/user.utils';
import { typeDefs, resolvers } from './schema';
import { graphqlUploadExpress } from 'graphql-upload';

const PORT = process.env.PORT;
const app = express();

const server = new ApolloServer({
  // schema,
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

app.use(graphqlUploadExpress());

server.listen(PORT).then(() => {
  console.log(`🚀 Server ready at http://localhost:${PORT} ✅`);
});
