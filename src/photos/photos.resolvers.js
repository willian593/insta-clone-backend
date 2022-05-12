import client from './../client';

export default {
  Photo: {
    user: ({ userId }) => {
      //   console.log(parent);
      return client.user.findUnique({ where: { id: userId } });
    },
    hashtags: ({ id }) => {
      return client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      });
    },
    // counter like
    likes: ({ id }) => client.like.count({ where: { photoId: id } }),
    commentNumber: ({ id }) => client.comment.count({ where: { photoId: id } }),
    // ver mis commentario
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
  },
  Hashtag: {
    photos: ({ id }, { page }, { loggedInUser }) =>
      // console.log(args),
      client.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .photos(),
    totalPhotos: ({ id }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: { id },
          },
        },
      }),
  },
};
