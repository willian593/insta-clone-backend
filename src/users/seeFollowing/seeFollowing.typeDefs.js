import { gql } from 'apollo-server';

export default gql`
  type SeeFollowingResult {
    ok: Boolean!
    msg: String
    following: [User]
  }

  type Query {
    seeFollowing(username: String!, lastId: Int): SeeFollowingResult!
  }
`;
