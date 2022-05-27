import client from './../client';

export default {
  User: {
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    // client.user.findUnique({ where: { id } }).following().conunt(),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),

    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },

    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },

    photos: ({ id }) => client.user.findUnique({ where: { id } }).photos(),
    comments: ({ id }) => client.user.findUnique({ where: { id } }).comments(),

    equalUsername: ({ firstName }) =>
      client.user.count({
        where: {
          firstName: {
            equals: firstName,
          },
        },
      }),
  },
};

// const exists = await client.user
// .findUnique({ where: { username: loggedInUser.username } })
// .following({
//   where: {
//     id,
//   },
// });
// return exists.length !== 0;
