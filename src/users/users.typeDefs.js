import { gql } from 'apollo-server';

// The GraphQL schema User
export const typeDefs = gql`
  type User {
    id: String!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createAt: String!
    updateAt: String!
    password: String!
    bio: String!
    avatar: String!
    photos: [Photo]
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    equalUsername: String!
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;
