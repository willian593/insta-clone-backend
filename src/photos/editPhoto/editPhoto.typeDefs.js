import { gql } from 'apollo-server';

export default gql`
  type EditPothoResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editPhoto(id: Int!, caption: String!): EditPothoResult!
  }
`;
