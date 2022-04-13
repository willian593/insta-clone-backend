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
