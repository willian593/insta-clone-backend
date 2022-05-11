import { gql } from 'apollo-server';
export default gql`
  type Photo {
    id: String!
    user: User
    file: String!
    caption: String
    commentNumber: Int!
    comment: [Comment]
    hashtags: [Hashtag]
    likes: Int!
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
  }

  type Hashtag {
    id: String!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
