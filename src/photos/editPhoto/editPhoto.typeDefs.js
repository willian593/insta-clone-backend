import { gql } from 'apollo-server';

export default gql`
  type EditPothoResult {
    ok: Boolean!
    msg: String
  }

  type Mutation {
    editPhoto(id: Int!, caption: String!): EditPothoResult!
  }
`;
