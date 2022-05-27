import { gql } from 'apollo-server';

export default gql`
  type Query {
    seeComments: [User]
  }
`;

/* see all comments  */
