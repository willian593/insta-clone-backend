import { gql } from 'apollo-server';

export default gql`
  type EditCommentResult {
    ok: Boolean!
    msg: String
  }

  type Mutation {
    editComment(id: Int!, payload: String!): EditCommentResult!
  }
`;
