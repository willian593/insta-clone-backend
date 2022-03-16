import { gql } from 'apollo-server';

// The GraphQL schema User
export const typeDefs = gql`
  type User {
    id: String!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    password: String!
    createAt: String!
    updateAt: String!
  }
`;
