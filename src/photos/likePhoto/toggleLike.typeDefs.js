import { gql } from 'apollo-server';
export default gql`
  type LikePhotoResult {
    ok: Boolean!
    msg: String
  }

  type Mutation {
    toggleLike(id: Int!): LikePhotoResult
  }
`;
