import { gql } from 'apollo-server';

export default gql`
  type loginResult {
    ok: Boolean!
    token: String
    error: String
  }

  type Mutation {
    login(username: String!, password: String!): loginResult!
  }
`;
