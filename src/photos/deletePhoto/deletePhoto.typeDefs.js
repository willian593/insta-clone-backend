import { gql } from 'apollo-server';

export default gql`
  type DeleteProfileResult {
    ok: Boolean!
    msg: String
  }

  type Mutation {
    deletePhoto(id: Int!): DeleteProfileResult!
  }
`;
