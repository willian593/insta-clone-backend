import { gql } from 'apollo-server';

export default gql`
  type EditProfileResult {
    ok: Boolean!
    msg: String
  }

  type Mutation {
    deleteComment(id: Int!): EditProfileResult!
  }
`;
