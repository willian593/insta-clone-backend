import { gql } from 'apollo-server';

export default gql`
  type Query {
    seePhotoComment(id: Int!): [Comment]
  }
`;
