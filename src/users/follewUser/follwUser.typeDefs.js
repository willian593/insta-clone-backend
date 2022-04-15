import { gql } from 'apollo-server';

export default gql`
  type FollowUserResult {
    ok: Boolean!
    msg: String
  }

  type Mutation {
    followUser(username: String): FollowUserResult!
  }
`;
