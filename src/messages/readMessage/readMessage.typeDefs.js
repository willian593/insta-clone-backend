import { gql } from 'apollo-server';

export default gql`
  type Query {
    readMessage(id: Int!): MutationResponse!
  }
`;
